let container = document.querySelector(".users-container");

fetch("http://localhost:8008/app/employees", {
  method: "GET",
  headers: {
    "Content-type": "application/json",
  },
})
  .then((res) => res.json())
  .then((data) => {
    console.log(data);

    const table = document.createElement("table");

    const headers = ["Name", "Email", "Role", "ID"];
    const headerRow = document.createElement("tr");
    headers.forEach((header) => {
      const th = document.createElement("th");
      th.textContent = header;
      headerRow.appendChild(th);
    });
    table.appendChild(headerRow);
    console.log(data);
    data.forEach((e) => {
      const tr = document.createElement("tr");

      const name = document.createElement("td");
      name.textContent = e.name;
      tr.appendChild(name);

      const email = document.createElement("td");
      email.textContent = e.email;
      tr.appendChild(email);

      const role = document.createElement("td");
      role.textContent = e.role;
      tr.appendChild(role);

      const id = document.createElement("td");
      id.setAttribute("id", "userID");
      id.textContent = e._id;
      tr.appendChild(id);

      table.appendChild(tr);
    });
    container.appendChild(table);
  })
  .catch((err) => {
    console.error({ msg: "something went wrong", error: err.message });
  });
