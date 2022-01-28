var dialog, form,
  required = $(".required-fields"),
  title = $("#title"),
  author = $("#author"),
  allFields = $([]).add(title).add(author);


function setMessage(message) {
  required
    .text(message)
    .addClass("ui-state-highlight");
  setTimeout(function() {
    required.removeClass("ui-state-highlight", 1500);
  }, 500);
}

function addBook() {
  var valid = true;
  allFields.removeClass("ui-state-error");
  valid = valid && checkLength(title, "Title", 1, 80);
  valid = valid && checkLength(author, "Author name", 1, 60);

  if (valid) {
    $("#books tbody").append("<tr>" +
      "<td>" + title.val() + "</td>" +
      "<td>" + author.val() + "</td>" +
      "</tr>");
    dialog.dialog("close");
  }
  return valid;
}

function checkLength(field, name, min, max) {
  if (field.val().length > max || field.val().length < min) {
    field.addClass("ui-state-error");
    setMessage(name + " length must be between " + min + " and " + max + ".");
    return false;
  } else {
    return true;
  }
}



dialog = $("#book-modal").dialog({
  autoOpen: false,
  height: 400,
  width: 300,
  modal: true,
  buttons: [{                   
    id:"add-new-book",
    text: "Add new book",
    click: addBook
  },{
    id:"btn-cancel",
    text: "Cancel",
    click: function() {
      dialog.dialog("close");
    }
  }],
  close: function() {
    form[0].reset();
    allFields.removeClass("ui-state-error");
  }
});

$("#add-book-modal").button().on("click", function() {
  dialog.dialog("open");
});

form = dialog.find("form").on("submit", function(event) {
  event.preventDefault();
  addBook();
});
