var getData = localStorage.getItem("jsonData");
var jsonData = getData ? JSON.parse(getData) : {};

if (Object.keys(jsonData).length === 0) {
  console.log("enter fetch");
  fetch("../data.json")
    .then((Response) => Response.json())
    .then((data) => {
      jsonData = data;
      processUserProfile(jsonData);
      renderData(jsonData);
    });
} else {
  processUserProfile(jsonData);
  renderData(jsonData);
}

document.getElementById("commentBtn").addEventListener("click", addToComment);

function processUserProfile(jsonData) {
  const currentImg = document.getElementById("currentImg");

  var currentUser = jsonData.currentUser;
  currentImg.src = currentUser.image.png;
  currentImg.alt = currentUser.username;
}

function renderData(dataJson) {
  var storeData = JSON.stringify(dataJson);
  localStorage.setItem("jsonData", storeData);

  var currentUser = dataJson.currentUser.username;

  var resultDataElem = dataJson["comments"].map((data) => {
    var replyElementGroup = data.replies.map((replyElem) => {
      if (currentUser != replyElem.user.username) {
        var returnValue = `<li class="reply" id="${replyElem.id}">
                    <div class="main-reply">
                      <div class="control-btn">
                        <div class="plus-btn plusReplyBtn">
                          <svg
                            width="11"
                            height="11"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
                            />
                          </svg>
                        </div>
                        <h3 class="number" data-score=${replyElem.score} >${replyElem.score}</h3>
                        <div class="minus-btn minusReplyBtn">
                          <svg
                            width="11"
                            height="3"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div class="msg-main">
                        <div class="msg-info">
                          <div class="img-profile">
                            <img
                              src="${replyElem.user.image.png}"
                              alt="${replyElem.user.username} pics"
                            />
                          </div>
                          <h3 class="profile-name profileName" data-profileName=${replyElem.user.username}>${replyElem.user.username}</h3>
                          <h3 class="date">${replyElem.createdAt}</h3>
                        </div>
                        <p class="msg-text">
                          <span>@${replyElem.replyingTo}</span> ${replyElem.content}
                        </p>
                        <div class="tool-bar reply-btn">
                          <svg
                            width="14"
                            height="13"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
                            />
                          </svg>
                          <span>reply</span>
                        </div>
                      </div>
                    </div>
                  </li>`;
      } else {
        var returnValue = `<li class="reply" id="${replyElem.id}">
                    <div class="main-reply">
                      <div class="control-btn">
                        <div class="plus-btn">
                          <svg
                            width="11"
                            height="11"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
                            />
                          </svg>
                        </div>
                        <h3 class="number">${replyElem.score}</h3>
                        <div class="minus-btn">
                          <svg
                            width="11"
                            height="3"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div class="msg-main">
                        <div class="msg-info">
                          <div class="img-profile">
                            <img
                              src="${replyElem.user.image.png}"
                              alt="${replyElem.user.username} pics"
                            />
                          </div>
                          <h3 class="profile-name profileName" data-profileName=${replyElem.user.username}>
                            ${replyElem.user.username} <span>You</span>
                          </h3>
                          <h3 class="date">${replyElem.createdAt}</h3>
                        </div>
                        <p class="msg-text">
                          <span>@${replyElem.replyingTo}</span> ${replyElem.content}
                        </p>
                        <textarea class="edit-input" data-replyingto=${replyElem.replyingTo} data-content='${replyElem.content}' >${replyElem.content}</textarea>
                        <a href="#" class="update-btn updateReplyBtn">update</a>
                        <div class="tool-bar self">
                          <div class="del-btn delBtnReply">
                            <svg
                              width="12"
                              height="14"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"
                              />
                            </svg>
                            <span>delete</span>
                          </div>
                          <div class="edit-btn editToggleBtn">
                            <svg
                              width="14"
                              height="14"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z"
                              />
                            </svg>
                            <span>edit</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>`;
      }
      return returnValue;
    });

    return `<li class="comment" id="${data.id}">
              <div class="main-comment">
                <div class="control-btn">
                  <div class="plus-btn ${
                    currentUser == data.user.username ? `` : `plusCommentBtn`
                  }">
                    <svg
                      width="11"
                      height="11"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
                      />
                    </svg>
                  </div>
                  <h3 class="number" data-score=${data.score} >${
      data.score
    }</h3>
                  <div class="minus-btn ${
                    currentUser == data.user.username ? `` : `minusCommentBtn`
                  }">
                    <svg
                      width="11"
                      height="3"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
                      />
                    </svg>
                  </div>
                </div>
                <div class="msg-main">
                  <div class="msg-info">
                    <div class="img-profile">
                      <img
                        src="${data.user.image.png}"
                        alt="${data.user.username} pics"
                      />
                    </div>
                    <h3 class="profile-name profileName" data-profileName=${
                      data.user.username
                    }>${data.user.username} ${
      currentUser == data.user.username ? `<span>You</span>` : ""
    }</h3>
                    <h3 class="date">${data.createdAt}</h3>
                  </div>
                  <p class="msg-text">
                    ${data.content}
                  </p>
                  <textarea class="edit-input" data-content='${data.content}'>${
      data.content
    }</textarea>
                  <a href="#" class="update-btn updateCommentBtn">update</a>
                  ${
                    currentUser != data.user.username
                      ? `
                  <div class="tool-bar comment-btn">
                    <svg
                      width="14"
                      height="13"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
                      />
                    </svg>
                    <span>reply</span>
                  </div>`
                      : `<div class="tool-bar self">
                          <div class="del-btn delCommentBtn">
                            <svg
                              width="12"
                              height="14"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"
                              />
                            </svg>
                            <span>delete</span>
                          </div>
                          <div class="edit-btn editToggleBtn">
                            <svg
                              width="14"
                              height="14"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z"
                              />
                            </svg>
                            <span>edit</span>
                          </div>
                        </div>`
                  }
                </div>
              </div>
              <div class="reply-contain ${
                replyElementGroup.join("") ? "" : `empty-reply`
              }">
                ${
                  replyElementGroup.join("")
                    ? `<div class="divide"></div>
                  <ul class="reply-group">
                    ${replyElementGroup.join("")}
                  </ul>`
                    : ""
                }
              </div>
            </li>`;
  });

  const commentGroup = document.querySelector(".comment-group");

  commentGroup.innerHTML = "";
  commentGroup.innerHTML = resultDataElem.join("");
  processEventHandler();
}

function processEventHandler() {
  const replyBtn = document.querySelectorAll(".comment-btn");
  const innerReplyBtn = document.querySelectorAll(".reply-btn");
  const deleteBtn = document.querySelectorAll(".delBtnReply");
  const delCommentBtn = document.querySelectorAll(".delCommentBtn");
  const plusCommentBtn = document.querySelectorAll(".plusCommentBtn");
  const minusCommentBtn = document.querySelectorAll(".minusCommentBtn");
  const plusReplyBtn = document.querySelectorAll(".plusReplyBtn");
  const minusReplyBtn = document.querySelectorAll(".minusReplyBtn");
  const editToggleBtn = document.querySelectorAll(".editToggleBtn");
  const updateCommentBtn = document.querySelectorAll(".updateCommentBtn");
  const updateReplyBtn = document.querySelectorAll(".updateReplyBtn");

  var currentUser = jsonData.currentUser;

  replyBtn.forEach((element) => {
    element.addEventListener("click", (e) => {
      var parentelem = element.parentElement.parentElement.parentElement;

      var replyContain = parentelem.querySelector(".reply-contain");

      var replyBox = parentelem.querySelector(".reply-id");

      if (!replyBox) {
        replyContain.insertAdjacentHTML(
          "beforebegin",
          `<div class="reply-box reply-id">
          <div class="user-pics">
            <img src="${currentUser.image.png}" alt="${currentUser.username}">
          </div>
          <textarea class="reply-input replyCommentInput" placeholder="Add a comment..."></textarea>
          <a href="#" class="reply-btn replyCommentBtn">reply</a>
        </div>`
        );
      }

      procressEventHandlerReply();
    });
  });

  innerReplyBtn.forEach((element) => {
    element.addEventListener("click", (e) => {
      var parentelem = element.parentElement.parentElement;
      var parentselem = element.parentElement.parentElement.parentElement;

      // var replyContain = parentelem.querySelector(".reply-contain");
      console.log(parentselem);
      var replyBox = parentselem.querySelector(".reply-inner");

      if (!replyBox) {
        parentelem.insertAdjacentHTML(
          "afterend",
          `<div class="reply-box reply-inner">
          <div class="user-pics">
            <img src="${currentUser.image.png}" alt="${currentUser.username}">
          </div>
          <textarea class="reply-input replyInnerInput" placeholder="Add a comment..."></textarea>
          <a href="#" class="reply-btn replyInnerBtn">reply</a>
        </div>`
        );
      }

      processEventHandlerInnerReply();
    });
  });

  deleteBtn.forEach((elem) => {
    elem.addEventListener("click", (e) => {
      e.preventDefault();

      var replyElem =
        elem.parentElement.parentElement.parentElement.parentElement;
      var commentElem =
        elem.parentElement.parentElement.parentElement.parentElement
          .parentElement.parentElement.parentElement;

      var replyIndex = Array.from(replyElem.parentElement.children).indexOf(
        replyElem
      );
      var commentIndex = Array.from(commentElem.parentElement.children).indexOf(
        commentElem
      );

      handleReplyDelete(commentIndex, replyIndex);
    });
  });

  delCommentBtn.forEach((elem) => {
    elem.addEventListener("click", (e) => {
      e.preventDefault();

      var commentElem =
        elem.parentElement.parentElement.parentElement.parentElement;

      var commentIndex = Array.from(commentElem.parentElement.children).indexOf(
        commentElem
      );

      handleReplyDelete(commentIndex, null);
    });
  });

  plusCommentBtn.forEach((elem) => {
    elem.addEventListener("click", (e) => {
      var numberElem = elem.parentElement.querySelector(".number");
      var commentElem = elem.parentElement.parentElement.parentElement;

      var scoreData = numberElem.dataset.score;

      var scoreValue = parseInt(scoreData) + 1;

      var commentIndex = Array.from(commentElem.parentElement.children).indexOf(
        commentElem
      );

      handleCount(scoreValue, commentIndex, null);
    });
  });

  minusCommentBtn.forEach((elem) => {
    elem.addEventListener("click", (e) => {
      var numberElem = elem.parentElement.querySelector(".number");
      var commentElem = elem.parentElement.parentElement.parentElement;

      var scoreData = numberElem.dataset.score;

      var scoreValue = parseInt(scoreData) - 1;
      var commentIndex = Array.from(commentElem.parentElement.children).indexOf(
        commentElem
      );

      handleCount(scoreValue, commentIndex, null);
    });
  });

  plusReplyBtn.forEach((elem) => {
    elem.addEventListener("click", (e) => {
      var numberElem = elem.parentElement.querySelector(".number");
      var commentElem =
        elem.parentElement.parentElement.parentElement.parentElement
          .parentElement.parentElement;
      var replyElem = elem.parentElement.parentElement.parentElement;

      var scoreData = numberElem.dataset.score;

      var scoreValue = parseInt(scoreData) + 1;
      var commentIndex = Array.from(commentElem.parentElement.children).indexOf(
        commentElem
      );
      var replyIndex = Array.from(replyElem.parentElement.children).indexOf(
        replyElem
      );

      handleCount(scoreValue, commentIndex, replyIndex);
    });
  });

  minusReplyBtn.forEach((elem) => {
    elem.addEventListener("click", (e) => {
      var numberElem = elem.parentElement.querySelector(".number");
      var commentElem =
        elem.parentElement.parentElement.parentElement.parentElement
          .parentElement.parentElement;
      var replyElem = elem.parentElement.parentElement.parentElement;

      var scoreData = numberElem.dataset.score;

      var scoreValue = parseInt(scoreData) - 1;
      var commentIndex = Array.from(commentElem.parentElement.children).indexOf(
        commentElem
      );
      var replyIndex = Array.from(replyElem.parentElement.children).indexOf(
        replyElem
      );

      handleCount(scoreValue, commentIndex, replyIndex);
    });
  });

  editToggleBtn.forEach((elem) => {
    elem.addEventListener("click", (e) => {
      elem.parentElement.classList.toggle("edit");
      elem.parentElement.parentElement
        .querySelector(".update-btn")
        .classList.toggle("edit");
      elem.parentElement.parentElement
        .querySelector(".msg-text")
        .classList.toggle("edit");
      elem.parentElement.parentElement
        .querySelector(".edit-input")
        .classList.toggle("edit");
    });
  });

  updateCommentBtn.forEach((elem) => {
    elem.addEventListener("click", (e) => {
      var inputElem = elem.parentElement.querySelector(".edit-input");
      var commentElem = elem.parentElement.parentElement.parentElement;

      var content = inputElem.value
        ? inputElem.value
        : inputElem.dataset.content;

      var commentIndex = Array.from(commentElem.parentElement.children).indexOf(
        commentElem
      );
      handleUpate(content, null, commentIndex, null);
    });
  });

  updateReplyBtn.forEach((elem) => {
    elem.addEventListener("click", (e) => {
      var inputElem = elem.parentElement.querySelector(".edit-input");
      var commentElem =
        elem.parentElement.parentElement.parentElement.parentElement
          .parentElement.parentElement;
      var replyElem = elem.parentElement.parentElement.parentElement;

      var content = inputElem.value
        ? inputElem.value
        : inputElem.dataset.content;

      var replyingTo = inputElem.dataset.replyingto;

      var commentIndex = Array.from(commentElem.parentElement.children).indexOf(
        commentElem
      );

      var replyIndex = Array.from(replyElem.parentElement.children).indexOf(
        replyElem
      );

      handleUpate(content, replyingTo, commentIndex, replyIndex);
    });
  });
}

function procressEventHandlerReply() {
  const replyCommentBtn = document.querySelectorAll(".replyCommentBtn");

  replyCommentBtn.forEach((elem) => {
    elem.addEventListener("click", (e) => {
      e.preventDefault();
      var replyCommentInput =
        elem.parentElement.querySelector(".replyCommentInput");

      if (replyCommentInput.value) {
        var profileElem =
          elem.parentElement.parentElement.querySelector(".profileName");

        var mainContainer = elem.parentElement.parentElement;
        var content = replyCommentInput.value;
        var replyingTo = profileElem.dataset.profilename;
        // Get the index of mainContainer within its parent's child nodes
        var commentIndex = Array.from(
          mainContainer.parentElement.children
        ).indexOf(mainContainer);

        addToReply(content, replyingTo, commentIndex);
      }
    });
  });
}

function processEventHandlerInnerReply() {
  const replyInnerBtn = document.querySelectorAll(".replyInnerBtn");

  replyInnerBtn.forEach((elem) => {
    elem.addEventListener("click", (e) => {
      e.preventDefault();
      var replyInnerInput =
        elem.parentElement.querySelector(".replyInnerInput");

      if (replyInnerInput.value) {
        var profileElem =
          elem.parentElement.parentElement.querySelector(".profileName");
        var mainContainer =
          elem.parentElement.parentElement.parentElement.parentElement
            .parentElement;

        var content = replyInnerInput.value;
        var replyingTo = profileElem.dataset.profilename;

        // Get the index of mainContainer within its parent's child nodes
        var commentIndex = Array.from(
          mainContainer.parentElement.children
        ).indexOf(mainContainer);

        addToReply(content, replyingTo, commentIndex);
      }
    });
  });
}

function addToComment(e) {
  e.preventDefault();
  var currentUser = jsonData.currentUser;
  var commentInput = document.getElementById("commentInput");

  if (commentInput.value) {
    var commentResult = {
      id: 5,
      content: commentInput.value,
      createdAt: "now",
      score: 0,
      user: {
        image: {
          png: currentUser.image.png,
        },
        username: currentUser.username,
      },
      replies: [],
    };

    jsonData.comments.push(commentResult);

    renderData(jsonData);
    commentInput.value = "";
  }
}

function addToReply(content, replyingTo, commentIndex) {
  var currentUser = jsonData.currentUser;

  var replyResult = {
    id: 3,
    content: content,
    createdAt: "now",
    score: 0,
    replyingTo: replyingTo,
    user: {
      image: {
        png: currentUser.image.png,
      },
      username: currentUser.username,
    },
  };

  jsonData.comments[commentIndex].replies.push(replyResult);

  renderData(jsonData);
}

function handleReplyDelete(commentIndex, replyIndex) {
  Swal.fire({
    titleText: "Delete Comment",
    text: "Are you sure you want to delete this comment? This will remove the comment and can't be undone.",
    showCancelButton: true,
    confirmButtonColor: `#ed6468`,
    cancelButtonColor: `#67727e`,
    cancelButtonText: `NO, CANCEL`,
    confirmButtonText: "YES, DELETE",
    reverseButtons: true,
  }).then((result) => {
    if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire({
        title: "Cancelled",
        text: "Your comment is safe :)",
        icon: "error",
      });
    } else if (result.dismissal === Swal.DismissReason.confirm) {
      if (replyIndex != null) {
        var removeReply = jsonData.comments[commentIndex].replies.splice(
          replyIndex,
          1
        );
        renderData(jsonData);
      } else {
        var removecomment = jsonData.comments.splice(commentIndex, 1);
        console.log(commentIndex, removecomment);
        renderData(jsonData);
      }
    }
  });
}

function handleCount(scoreValue, commentIndex, replyIndex) {
  if (replyIndex != null) {
    jsonData.comments[commentIndex].replies[replyIndex].score = scoreValue;
    renderData(jsonData);
  } else {
    jsonData.comments[commentIndex].score = scoreValue;
    renderData(jsonData);
  }
}

function handleUpate(content, replyingTo, commentIndex, replyIndex) {
  if (replyingTo != null && replyIndex != null) {
    jsonData.comments[commentIndex].replies[replyIndex].content = content;
    jsonData.comments[commentIndex].replies[replyIndex].replyingTo = replyingTo;
    renderData(jsonData);
  } else {
    jsonData.comments[commentIndex].content = content;
    renderData(jsonData);
  }
}
