(function ($) {
  let $forms = $(".contact-form, .subscription-form");

  if ($forms && $forms.length) {
    $forms.each(function () {
      let $form = $(this);
      let $submit = $(this).find(".btn-primary");

      $form.find("input, textarea").on("keydown", function (e) {
        if (e.keyCode === 13 && e.shiftKey) {
          $form.submit();
        }
      });

      $form.submit(function () {
        $form.addClass("submitting");
        $submit.attr("disabled", true);

        $.ajax({
          type: "POST",
          url: $(this).attr("action"),
          data: $(this).serialize(),
          dataType: "JSON",
        }).always(function (result) {
          if (result && result.status === 200) {
            $form.addClass("success");
          } else {
            $form.addClass("error");
          }
          $form.removeClass("submitting");
          $form.addClass("submitted");

          $form.find("input[type=text], textarea").val("");
          $submit.attr("disabled", false);

          setTimeout(function () {
            $form.removeClass("submitted");
            $form.removeClass("success");
            $form.removeClass("error");
          }, 10000);
        });

        return false;
      });
    });
  }

  let $window = $(window);
  let $body = $("body");
  let $topicLists = $('.topic-list[data-scrolling-topic-list="true"]');

  function loadTopics($topicList) {
    let topicListBottom =
      $topicList.offset().top + $topicList.outerHeight(true);
    let windowBottom = $window.scrollTop() + $window.height();
    let reachedBottom = topicListBottom <= windowBottom - 50;
    let loading = $topicList.hasClass("loading");
    let listEnd = $topicList.data("list-end");

    if (reachedBottom && !loading && !listEnd) {
      const count = $topicList.children().length;
      const perPage = Number($topicList.data("list-per-page"));
      const currentTopicIds = $topicList
        .find(".topic-list-item")
        .map(function () {
          return Number($(this).data("topic-id"));
        })
        .get();
      const page = Number($topicList.data("list-page"));

      const data = {
        page_id: $topicList.data("page-id"),
        list_opts: {
          category: $topicList.data("list-category"),
          except_topic_ids: currentTopicIds,
          page,
          per_page: perPage,
          no_definitions: $topicList.data("list-no-definitions"),
        },
        item_opts: {
          classes: $topicList.data("item-classes"),
          excerpt_length: $topicList.data("item-excerpt-length"),
          include_avatar: $topicList.data("item-include-avatar"),
          profile_details: $topicList.data("item-profile-details"),
          avatar_size: $topicList.data("item-avatar-size"),
        },
      };

      if (count === perPage * (page + 1)) {
        $topicList.addClass("loading");

        $.ajax({
          type: "GET",
          url: "/landing/topic-list",
          data,
          success: function (result) {
            $topicList.append(result.topics_html);
            let newCount = $topicList.children().length;

            if (newCount === count) {
              $topicList.attr("data-list-end", true);
            } else {
              let newPage = page + 1;
              $topicList.attr("data-page", newPage);

              if (newCount < perPage * (newPage + 1)) {
                $topicList.attr("data-list-end", true);
              }
            }
          },
        }).always(function () {
          $topicList.removeClass("loading");
        });
      } else {
        $topicList.attr("data-list-end", true);
      }
    }
  }

  if ($window) {
    $window.on("scroll", function () {
      $body.toggleClass("scrolled", $window.scrollTop() > 0);

      if ($topicLists.length) {
        $topicLists.each(function () {
          loadTopics($(this));
        });
      }
    });
  }
})(jQuery); // eslint-disable-line

    // Get the modal elements
    var modals = document.querySelectorAll('.modal');
    var detailBoxes = document.querySelectorAll('.detail-box');
    var spans = document.querySelectorAll('.close');

    // Open the modal
    detailBoxes.forEach((box, index) => {
        box.addEventListener('click', () => {
            modals[index].style.display = 'block';
        });
    });

    // Close the modal when the user clicks on <span> (x)
    spans.forEach((span, index) => {
        span.addEventListener('click', () => {
            modals[index].style.display = 'none';
        });
    });

    // Close the modal when the user clicks anywhere outside of the modal
    window.addEventListener('click', (event) => {
        modals.forEach((modal) => {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        });
    });

    // Arrays of buzzwords for each modal
    const buzzwords = {
        connect: ["Screenings/Podcasts Q&A", "Cohort Courses", "Book Clubs", "Networking-Events", "Game-Nights", "Workshops", "Hackathons", "Conferences", "Meetups", "Webinars"],
        collaborate: ["Team Challenges", "Hackathons", "Summits"],
        contribute: ["Volunteering", "Donations", "Mentorship", "Service-Learning", "Internships", "Fellowships", "Scholarships", "Grants", "Sponsorships", "Partnerships"]
    };

    // Function to change buzzwords dynamically
    function changeBuzzword(modalId, buzzwordArray) {
        let currentIndex = 0;
        const textElement = document.getElementById(`dynamic-text-${modalId}`);
        
        function updateText() {
            textElement.innerHTML = buzzwordArray[currentIndex];
            currentIndex = (currentIndex + 1) % buzzwordArray.length;
        }

        setInterval(updateText, 3000);
    }

    // Initialize buzzword changes for each modal
    changeBuzzword('connect', buzzwords.connect);
    changeBuzzword('collaborate', buzzwords.collaborate);
    changeBuzzword('contribute', buzzwords.contribute);


    // Hover effect for detail boxes
        document.querySelectorAll('.detail-content').forEach(box => {
            const originalBackgroundImage = box.style.backgroundImage;
            box.addEventListener('mouseover', () => {
                box.querySelector('.detail-overlay').style.display = 'block';
                box.style.backgroundImage = 'none';
            });
            box.addEventListener('mouseout', () => {
                box.querySelector('.detail-overlay').style.display = 'none';
                box.style.backgroundImage = originalBackgroundImage;
            });
        });





    import Typebot from 'https://cdn.jsdelivr.net/npm/@typebot.io/js@0.3.4/dist/web.js';
    
    Typebot.initBubble({
        typebot: "chat-ccw",
        apiHost: "https://chat.cocreation.world",
        previewMessage: { message: "Whats on your mind?", autoShowDelay: 3000 },
        theme: {
            button: {
                backgroundColor: "#3C3144",
                customIconSrc: "https://minio-production-fa1d.up.railway.app/typebot/public/workspaces/clwxv3blz001hp28kvtibhtth/typebots/cm00rfuyi0001uh083fc0hsxt/bubble-icon?v=1728660896913",
                size: "large"
            },
            previewMessage: { textColor: "#3C3144", closeButtonIconColor: "#3C3144" },
            chatWindow: {
                backgroundColor: "https://minio-production-fa1d.up.railway.app/typebot/public/workspaces/clwxv3blz001hp28kvtibhtth/typebots/cm00rfuyi0001uh083fc0hsxt/background?v=1728663900016"
            }
        }
    });

 