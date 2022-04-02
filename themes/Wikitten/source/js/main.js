/* eslint-disable require-jsdoc */
(function ($) {
  /**
   * applyCategoryExpandEvent
   * Attach event for the expand/shrink button in categories header
   */
  function applyCategoryExpandEvent() {
    $("#expand").on("click", function () {
      changeCategoryExpandClass("expand");
    });
    $("#shrink").on("click", function () {
      changeCategoryExpandClass("shrink");
    });
  }

  function triggerSearch() {
    $(".search-form-input").click();
  }

  function triggerSearchInHomepage() {
    if (window.location.pathname === "/") triggerSearch();

    const queryString = {};
    $.each(document.location.search.substr(1).split("&"), function (c, q) {
      var i = q.split("=");
      queryString[i[0].toString()] = i[1].toString();
    });

    const keyword = queryString['query']
    if (keyword && keyword.length > 0) {
      $(".ins-search-input").val(keyword)
    }
  }

  /**
   *
   * @param {*} action
   */
  function changeCategoryExpandClass(action) {
    const colNum = $("#sidebar").data("col");

    if (action === "expand" && colNum === 12) return;
    if (action === "shrink" && colNum === 2) return;

    const newColNum = action === "expand" ? colNum + 1 : colNum - 1;
    $("#sidebar")
      .removeClass("col-md-" + colNum)
      .addClass("col-md-" + newColNum);
    $("#main")
      .removeClass("col-md-" + (12 - colNum))
      .addClass("col-md-" + (12 - newColNum));

    $("#sidebar").data("col", newColNum);
  }

  function applyTableStyle() {
    // $('table:not(figure table)').data('toggle', 'table');
    $("table:not(figure table)").addClass("table table-bordered table-sm");

    $("table:not(figure table)").bootstrapTable({
      showColumns: true,
      minimumCountColumns: 2,
      search: true,
      sortable: true,
      sortOrder: "asc",
    });
  }

  /**
   * render the tasklist in markdown
   */
  function markdownTaskListInit() {
    $(".article-entry ul > li").each(function () {
      if ($(this).children('input[type="checkbox"]').length > 0) {
        $(this).addClass("task-list");
      }
    });
  }

  function attachSearchHotkey() {
    $(document).keypress(function (e) {
      /* Ctrl+Enter */
      if ((e.ctrlKey && e.witch == 13) || e.which == 10) {
        triggerSearch();
      }
    });
  }

  function attachCodeBlockCopyButton() {
    let copyHtml = "";
    copyHtml +=
      '<button class="btn-copy float-right btn-link btn btn-sm text-white" data-clipboard-snippet="">';
    copyHtml += '  <i class="fa fa-clipboard"></i>';
    copyHtml += "</button>";
    $("figure.highlight").prepend(copyHtml);
    new ClipboardJS(".btn-copy", {
      target: function (trigger) {
        return $(trigger).siblings().find(".code pre").get(0);
      },
    });
  }

  function applyTOC() {
    if ($(".article-entry h1,h2").length <= 1) return;
    tocbot.init({
      tocSelector: ".toc",
      collapseDepth: 3,
      contentSelector: ".article-entry",
      headingSelector: "h1, h2, h3, h4, h5, h6",
    });
    $("#toc").removeClass("d-none");
  }

  const timer = setInterval(() => {
    const decrypted = $("#hbePass").length === 0;
    console.log("decrypted: ", decrypted);
    if (decrypted) {
      attachCodeBlockCopyButton();
      applyTableStyle();
      applyTOC();
      markdownTaskListInit();
      window.clearInterval(timer);
    }
  }, 3000);
  applyCategoryExpandEvent();
  attachSearchHotkey();
  triggerSearchInHomepage();
})(jQuery);
