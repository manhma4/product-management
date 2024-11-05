// Button Status
const buttonsStatus = document.querySelectorAll("[button-status]");

if (buttonsStatus.length > 0) {
  let url = new URL(window.location.href);
  console.log(url);
  buttonsStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");
      if (status) {
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }
      window.location.href = url.href; // Chuyển hướng sang trang khác
    });
  });
}
// End Button Status

// Form search
const formSearch = document.querySelector("#form-search");
if (formSearch) {
  let url = new URL(window.location.href);

  formSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    const keyWord = e.target.elements.keyword.value;

    if (keyWord) {
      url.searchParams.set("keyword", keyWord);
    } else {
      url.searchParams.delete("keyword");
    }
    window.location.href = url.href;
  });
}
// End Form Search

//Pagination

const buttonPagination = document.querySelectorAll("[button-pagination]");
if (buttonPagination) {
  let url = new URL(window.location.href);

  buttonPagination.forEach((button) => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("button-pagination");
      url.searchParams.set("page", page);

      window.location.href = url.href;
    });
  });
}
//End Pagination

//Checkbox Multi

const checkboxMulti = document.querySelector("[checkbox-multi]");
if (checkboxMulti) {
  const inputCheckALL = checkboxMulti.querySelector("input[name='checkall']");
  const inputsID = checkboxMulti.querySelectorAll("input[name='id']");

  inputCheckALL.addEventListener("click", () => {
    if (inputCheckALL.checked) {
      inputsID.forEach((input) => {
        input.checked = true;
      });
    } else {
      inputsID.forEach((input) => {
        input.checked = false;
      });
    }
  });

  inputsID.forEach((input) => {
    input.addEventListener("click", () => {
      const countChecked = checkboxMulti.querySelectorAll(
        "input[name='id']:checked"
      ).length;
      if (countChecked == inputsID.length) {
        inputCheckALL.checked = true;
      } else {
        inputCheckALL.checked = false;
      }
    });
  });
}

//End Checkbox Multi

//Form Change Multi

const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault();

    const checkboxMulti = document.querySelector("[checkbox-multi]");
    const inputsChecked = checkboxMulti.querySelectorAll(
      "input[name='id']:checked"
    );

    const typeChange = e.target.elements.type.value;
    if (typeChange == "delete-all") {
      const isConfirm = confirm("bạn có chắc muốn xóa những sản phẩm này ?");
      if (!isConfirm) {
        return;
      }
    }

    if (inputsChecked.length > 0) {
      let ids = [];
      const inputIds = formChangeMulti.querySelector("input[name='ids']");
      inputsChecked.forEach((input) => {
        const id = input.value;

        if (typeChange == "change-position") {
          const position = input
            .closest("tr")
            .querySelector("input[name='position']").value;

          ids.push(`${id}-${position}`);
        } else {
          ids.push(id);
        }
      });

      inputIds.value = ids.join(", ");

      formChangeMulti.submit();
    } else {
      alert("vui lòng chọn 1 sản phẩm ");
    }
  });
}

//End Form Change Multi
