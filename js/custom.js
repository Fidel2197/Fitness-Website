/*---------------------------------------------------------------------
    File Name: custom.js
---------------------------------------------------------------------*/

$(function () {

  "use strict";

  /* Preloader
  -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

  setTimeout(function () {
    $('.loader_bg').fadeToggle();
  }, 1500);

  /* Tooltip
  -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

  $(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });


  /* Mouseover
  -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

  $(document).ready(function () {
    $(".main-menu ul li.megamenu").mouseover(function () {
      if (!$(this).parent().hasClass("#wrapper")) {
        $("#wrapper").addClass('overlay');
      }
    });
    $(".main-menu ul li.megamenu").mouseleave(function () {
      $("#wrapper").removeClass('overlay');
    });
  });


  /* Toggle sidebar
  -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

  $(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active');
      $(this).toggleClass('active');
    });
  });

  /* Product slider 
  -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
  // optional
  $('#blogCarousel').carousel({
    interval: 5000
  });


});


/* Toggle sidebar
     -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
function openNav() {
  document.getElementById("mySidepanel").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidepanel").style.width = "0";
}


/* Animate js*/

(function ($) {
  //Function to animate slider captions
  function doAnimations(elems) {
    //Cache the animationend event in a variable
    var animEndEv = "webkitAnimationEnd animationend";

    elems.each(function () {
      var $this = $(this),
        $animationType = $this.data("animation");
      $this.addClass($animationType).one(animEndEv, function () {
        $this.removeClass($animationType);
      });
    });
  }

  //Variables on page load
  var $myCarousel = $("#carouselExampleIndicators"),
    $firstAnimatingElems = $myCarousel
    .find(".carousel-item:first")
    .find("[data-animation ^= 'animated']");

  //Initialize carousel
  $myCarousel.carousel();

  //Animate captions in first slide on page load
  doAnimations($firstAnimatingElems);

  //Other slides to be animated on carousel slide event
  $myCarousel.on("slide.bs.carousel", function (e) {
    var $animatingElems = $(e.relatedTarget).find(
      "[data-animation ^= 'animated']"
    );
    doAnimations($animatingElems);
  });
})(jQuery);


/* collapse js*/

$(document).ready(function () {
  // Add minus icon for collapse element which is open by default
  $(".collapse.show").each(function () {
    $(this).prev(".card-header").find(".fa").addClass("fa-minus").removeClass("fa-plus");
  });

  // Toggle plus minus icon on show hide of collapse element
  $(".collapse").on('show.bs.collapse', function () {
    $(this).prev(".card-header").find(".fa").removeClass("fa-plus").addClass("fa-minus");
  }).on('hide.bs.collapse', function () {
    $(this).prev(".card-header").find(".fa").removeClass("fa-minus").addClass("fa-plus");
  });
});

/* select flag js */

function onChangeCallback(ctr) {
  console.log("The country was changed: " + ctr);
  //$("#selectionSpan").text(ctr);
}

$(document).ready(function () {
  $(".niceCountryInputSelector").each(function (i, e) {
    new NiceCountryInput(e).init();
  });
});


// define all UI variable
const navToggler = document.querySelector('.nav-toggler');
const navMenu = document.querySelector('.site-navbar ul');
const navLinks = document.querySelectorAll('.site-navbar a');

// load all event listners
if (navToggler && navMenu) {
  allEventListners();
}

// functions of all event listners
function allEventListners() {
  // toggler icon click event
  navToggler.addEventListener('click', togglerClick);
  // nav links click event
  navLinks.forEach( elem => elem.addEventListener('click', navLinkClick));
}

// togglerClick function
function togglerClick() {
  navToggler.classList.toggle('toggler-open');
  navMenu.classList.toggle('open');
}

// navLinkClick function
function navLinkClick() {
  if(navMenu.classList.contains('open')) {
    navToggler.click();
  }
}

/* FitNex workout tracker */
(function () {
  const workoutForm = document.getElementById("workoutForm");

  if (!workoutForm) {
    return;
  }

  const storageKey = "fitnex-tracker-v1";
  const goalForm = document.getElementById("goalForm");
  const clearWorkouts = document.getElementById("clearWorkouts");
  const workoutList = document.getElementById("workoutList");
  const elements = {
    exerciseName: document.getElementById("exerciseName"),
    exerciseType: document.getElementById("exerciseType"),
    workoutDate: document.getElementById("workoutDate"),
    workoutMinutes: document.getElementById("workoutMinutes"),
    workoutCalories: document.getElementById("workoutCalories"),
    weeklyMinutesGoal: document.getElementById("weeklyMinutesGoal"),
    weeklyWorkoutGoal: document.getElementById("weeklyWorkoutGoal"),
    totalWorkouts: document.getElementById("totalWorkouts"),
    totalMinutes: document.getElementById("totalMinutes"),
    totalCalories: document.getElementById("totalCalories"),
    weeklyMinutesText: document.getElementById("weeklyMinutesText"),
    weeklyWorkoutsText: document.getElementById("weeklyWorkoutsText"),
    weeklyMinutesBar: document.getElementById("weeklyMinutesBar"),
    weeklyWorkoutsBar: document.getElementById("weeklyWorkoutsBar"),
    progressNote: document.getElementById("progressNote"),
    trackerTip: document.getElementById("trackerTip"),
    trackerFeedback: document.getElementById("trackerFeedback")
  };

  const state = {
    workouts: [],
    goals: {
      weeklyMinutes: 150,
      weeklyWorkouts: 4
    }
  };

  function todayInputValue() {
    const today = new Date();
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
    return today.toISOString().slice(0, 10);
  }

  function readNumber(value, fallback) {
    const number = Number(value);
    return Number.isFinite(number) ? number : fallback;
  }

  function formatNumber(number) {
    return new Intl.NumberFormat("en-US").format(number);
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (character) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
      }[character];
    });
  }

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey));

      if (saved && Array.isArray(saved.workouts)) {
        state.workouts = saved.workouts.filter(function (workout) {
          return workout && workout.name && workout.date;
        });
      }

      if (saved && saved.goals) {
        state.goals.weeklyMinutes = Math.max(30, readNumber(saved.goals.weeklyMinutes, 150));
        state.goals.weeklyWorkouts = Math.max(1, readNumber(saved.goals.weeklyWorkouts, 4));
      }
    } catch (error) {
      state.workouts = [];
    }
  }

  function saveState() {
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch (error) {
      setFeedback("Your browser blocked saving, but the tracker still works for this visit.");
    }
  }

  function setFeedback(message) {
    if (elements.trackerFeedback) {
      elements.trackerFeedback.textContent = message || "";
    }
  }

  function getWeekStart(date) {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    start.setDate(start.getDate() - start.getDay());
    return start;
  }

  function getThisWeekWorkouts() {
    const weekStart = getWeekStart(new Date());

    return state.workouts.filter(function (workout) {
      return new Date(workout.date + "T00:00:00") >= weekStart;
    });
  }

  function updateProgressBar(bar, percent) {
    if (bar) {
      bar.style.width = Math.min(100, Math.max(0, percent)) + "%";
    }
  }

  function getTip(weekMinutes, weekWorkouts) {
    if (state.workouts.length === 0) {
      return "Log your first workout to get a progress-based suggestion.";
    }

    const latestWorkout = state.workouts
      .slice()
      .sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      })[0];

    if (weekMinutes >= state.goals.weeklyMinutes && weekWorkouts >= state.goals.weeklyWorkouts) {
      return "You reached both weekly goals. Keep the habit steady and schedule recovery so the progress lasts.";
    }

    if (latestWorkout.type === "Strength") {
      return "Your latest session was strength-based. Pair heavy days with recovery, protein, and good sleep.";
    }

    if (latestWorkout.type === "Cardio") {
      return "Nice cardio work. Mix steady sessions with intervals to build endurance without burning out.";
    }

    if (latestWorkout.type === "Recovery") {
      return "Recovery counts. Mobility, stretching, and rest help you come back stronger for the next session.";
    }

    return "Keep balancing effort and consistency. Small logged sessions still count toward a stronger week.";
  }

  function renderWorkoutList() {
    if (!workoutList) {
      return;
    }

    if (state.workouts.length === 0) {
      workoutList.innerHTML = '<li class="empty-workouts">No workouts logged yet. Add one above to start tracking progress.</li>';
      return;
    }

    const recentWorkouts = state.workouts
      .slice()
      .sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      })
      .slice(0, 6);

    workoutList.innerHTML = recentWorkouts.map(function (workout) {
      return [
        '<li>',
          '<div>',
            '<strong>' + escapeHtml(workout.name) + '</strong>',
            '<span>' + escapeHtml(workout.type) + ' | ' + escapeHtml(workout.minutes) + ' min | ' + escapeHtml(workout.calories) + ' cal | ' + escapeHtml(workout.date) + '</span>',
          '</div>',
          '<button class="delete-workout" type="button" data-id="' + escapeHtml(workout.id) + '">Delete</button>',
        '</li>'
      ].join("");
    }).join("");
  }

  function render() {
    const totalMinutes = state.workouts.reduce(function (total, workout) {
      return total + readNumber(workout.minutes, 0);
    }, 0);
    const totalCalories = state.workouts.reduce(function (total, workout) {
      return total + readNumber(workout.calories, 0);
    }, 0);
    const weekWorkouts = getThisWeekWorkouts();
    const weekMinutes = weekWorkouts.reduce(function (total, workout) {
      return total + readNumber(workout.minutes, 0);
    }, 0);
    const minutesPercent = (weekMinutes / state.goals.weeklyMinutes) * 100;
    const workoutsPercent = (weekWorkouts.length / state.goals.weeklyWorkouts) * 100;
    const remainingMinutes = Math.max(0, state.goals.weeklyMinutes - weekMinutes);
    const remainingWorkouts = Math.max(0, state.goals.weeklyWorkouts - weekWorkouts.length);

    elements.totalWorkouts.textContent = formatNumber(state.workouts.length);
    elements.totalMinutes.textContent = formatNumber(totalMinutes);
    elements.totalCalories.textContent = formatNumber(totalCalories);
    elements.weeklyMinutesGoal.value = state.goals.weeklyMinutes;
    elements.weeklyWorkoutGoal.value = state.goals.weeklyWorkouts;
    elements.weeklyMinutesText.textContent = weekMinutes + " / " + state.goals.weeklyMinutes + " min";
    elements.weeklyWorkoutsText.textContent = weekWorkouts.length + " / " + state.goals.weeklyWorkouts + " workouts";

    updateProgressBar(elements.weeklyMinutesBar, minutesPercent);
    updateProgressBar(elements.weeklyWorkoutsBar, workoutsPercent);
    renderWorkoutList();

    if (remainingMinutes === 0 && remainingWorkouts === 0) {
      elements.progressNote.textContent = "Weekly goals complete. Strong work.";
    } else {
      elements.progressNote.textContent = remainingMinutes + " minutes and " + remainingWorkouts + " workouts left for this week.";
    }

    elements.trackerTip.textContent = getTip(weekMinutes, weekWorkouts.length);
  }

  elements.workoutDate.value = todayInputValue();
  loadState();
  render();

  workoutForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = elements.exerciseName.value.trim();
    const minutes = Math.max(1, readNumber(elements.workoutMinutes.value, 30));
    const calories = Math.max(0, readNumber(elements.workoutCalories.value, 0));
    const date = elements.workoutDate.value || todayInputValue();

    if (!name) {
      setFeedback("Add an exercise name first.");
      return;
    }

    state.workouts.unshift({
      id: Date.now().toString(),
      name: name,
      type: elements.exerciseType.value,
      minutes: minutes,
      calories: calories,
      date: date
    });

    saveState();
    workoutForm.reset();
    elements.workoutDate.value = todayInputValue();
    elements.workoutMinutes.value = 30;
    elements.workoutCalories.value = 180;
    setFeedback("Workout added. Your progress has been updated.");
    render();
  });

  goalForm.addEventListener("submit", function (event) {
    event.preventDefault();

    state.goals.weeklyMinutes = Math.max(30, readNumber(elements.weeklyMinutesGoal.value, 150));
    state.goals.weeklyWorkouts = Math.max(1, readNumber(elements.weeklyWorkoutGoal.value, 4));
    saveState();
    setFeedback("Goals saved. Progress targets updated.");
    render();
  });

  workoutList.addEventListener("click", function (event) {
    const deleteButton = event.target.closest(".delete-workout");

    if (!deleteButton) {
      return;
    }

    state.workouts = state.workouts.filter(function (workout) {
      return workout.id !== deleteButton.dataset.id;
    });
    saveState();
    setFeedback("Workout removed.");
    render();
  });

  clearWorkouts.addEventListener("click", function () {
    if (state.workouts.length === 0) {
      setFeedback("There are no workouts to clear yet.");
      return;
    }

    state.workouts = [];
    saveState();
    setFeedback("Workout log cleared.");
    render();
  });
})();

/* FitNex local account flow */
(function () {
  const modal = document.getElementById("fitnessAuthModal");
  const openButtons = [
    document.getElementById("openFitnessAuth"),
    document.getElementById("openFitnessAuthHero"),
    document.getElementById("openFitnessAuthMember")
  ].filter(Boolean);

  if (!modal || openButtons.length === 0) {
    return;
  }

  const storageKey = "fitnex-account-v1";
  const closeButton = document.getElementById("closeFitnessAuth");
  const status = document.getElementById("fitnessAuthStatus");
  const summary = document.getElementById("fitnessAuthSummary");
  const createForm = document.getElementById("fitnessCreateForm");
  const signInForm = document.getElementById("fitnessSignInForm");
  const verifyForm = document.getElementById("fitnessVerifyForm");
  const codeBox = document.getElementById("fitnessCodeBox");
  const resendButton = document.getElementById("fitnessResendCode");
  const signOutButton = document.getElementById("fitnessSignOut");
  const tabs = document.querySelectorAll("[data-fitness-auth-tab]");

  let account = loadAccount();

  function loadAccount() {
    try {
      return JSON.parse(localStorage.getItem(storageKey)) || defaultAccount();
    } catch (error) {
      return defaultAccount();
    }
  }

  function defaultAccount() {
    return {
      hasAccount: false,
      name: "",
      email: "",
      passwordToken: "",
      goal: "Build strength",
      signedIn: false,
      verified: false,
      code: ""
    };
  }

  function saveAccount() {
    localStorage.setItem(storageKey, JSON.stringify(account));
  }

  function passwordToken(value) {
    return btoa(unescape(encodeURIComponent(value))).slice(0, 28);
  }

  function makeCode() {
    return String(Math.floor(100000 + Math.random() * 900000));
  }

  function firstName(name) {
    return (name || "").trim().split(/\s+/)[0] || "Member";
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (character) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
      }[character];
    });
  }

  function setMode(mode) {
    tabs.forEach(function (tab) {
      tab.classList.toggle("active", tab.dataset.fitnessAuthTab === mode);
    });
    createForm.classList.toggle("active", mode === "create");
    signInForm.classList.toggle("active", mode === "signin");
  }

  function renderAccount() {
    const label = account.signedIn ? firstName(account.name) : "Sign In";
    openButtons.forEach(function (button) {
      if (button.id === "openFitnessAuth") {
        button.textContent = account.signedIn ? label : "Sign In";
      }
    });

    if (!account.hasAccount) {
      status.textContent = "Not signed in";
      summary.textContent = "Create an account or sign in to save your name, goal, and verified status locally.";
      codeBox.textContent = "Create or sign in to receive a demo confirmation code.";
      signOutButton.hidden = true;
      return;
    }

    status.textContent = [
      account.email,
      account.signedIn ? "Signed in" : "Signed out",
      account.verified ? "Verified" : "Verification needed"
    ].join(" | ");
    summary.textContent = account.signedIn
      ? `${firstName(account.name)}, your current focus is ${account.goal}.`
      : "Sign in to continue with your saved local FitNex profile.";
    codeBox.innerHTML = account.verified
      ? "Your local FitNex account is verified."
      : `Demo confirmation email<br><strong>To:</strong> ${escapeHtml(account.email)}<br><strong>Code:</strong> ${escapeHtml(account.code || "Send a new code")}`;
    signOutButton.hidden = !account.signedIn;
  }

  function openModal(mode) {
    setMode(mode || (account.hasAccount ? "signin" : "create"));
    renderAccount();
    modal.hidden = false;
  }

  function closeModal() {
    modal.hidden = true;
  }

  openButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      openModal();
    });
  });

  if (window.location.hash === "#account") {
    openModal();
  }

  closeButton.addEventListener("click", closeModal);

  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeModal();
    }
  });

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      setMode(tab.dataset.fitnessAuthTab);
    });
  });

  createForm.addEventListener("submit", function (event) {
    event.preventDefault();
    account = {
      hasAccount: true,
      name: document.getElementById("fitnessCreateName").value.trim(),
      email: document.getElementById("fitnessCreateEmail").value.trim().toLowerCase(),
      passwordToken: passwordToken(document.getElementById("fitnessCreatePassword").value),
      goal: document.getElementById("fitnessCreateGoal").value,
      signedIn: true,
      verified: false,
      code: makeCode()
    };
    saveAccount();
    renderAccount();
  });

  signInForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("fitnessSignInEmail").value.trim().toLowerCase();
    const token = passwordToken(document.getElementById("fitnessSignInPassword").value);

    if (!account.hasAccount || account.email !== email || account.passwordToken !== token) {
      codeBox.textContent = "That email or password does not match the local FitNex account.";
      return;
    }

    account.signedIn = true;
    if (!account.verified && !account.code) {
      account.code = makeCode();
    }
    saveAccount();
    renderAccount();
  });

  verifyForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const value = document.getElementById("fitnessVerificationCode").value.trim();

    if (!account.hasAccount || !account.signedIn) {
      codeBox.textContent = "Sign in before verifying the account.";
      return;
    }

    if (value !== account.code) {
      codeBox.textContent = "That code does not match. Use the demo code shown above.";
      return;
    }

    account.verified = true;
    account.code = "";
    saveAccount();
    renderAccount();
  });

  resendButton.addEventListener("click", function () {
    if (!account.hasAccount) {
      codeBox.textContent = "Create an account first.";
      return;
    }
    account.code = makeCode();
    account.verified = false;
    saveAccount();
    renderAccount();
  });

  signOutButton.addEventListener("click", function () {
    account.signedIn = false;
    saveAccount();
    renderAccount();
  });

  renderAccount();
})();
