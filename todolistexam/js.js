class User {
    constructor(API) {
        this.API = API;
        this.get();
        this.box = document.querySelector(".box");
        this.section = document.querySelector(".section");
        this.tarafirost = document.querySelector(".tarafirost");
        this.list = document.querySelector(".list");
        this.search = document.querySelector(".search");
        this.selectstatus = document.querySelector(".selectstatus");
        this.add = document.querySelector(".add");
        this.tarafichap = document.querySelector(".tarafichap");
        this.trchap = document.querySelector('.trchap');
        this.addDialog = document.querySelector('.addDialog');
        this.addForm = document.querySelector(".addForm");
        this.addSelect = document.querySelector(".addSelect");
        this.xclose = document.querySelector(".xclose");
        this.close = document.querySelector(".close");
        this.editDialog = document.querySelector('.editDialog');
        this.editForm = document.querySelector(".editForm");
        this.editSelect = document.querySelector(".editSelect");
        this.editxclose = document.querySelector(".editxclose");
        this.getbyId = document.querySelector(".getbyIds");
        this.idd = document.querySelector(".idd");
        this.idds = document.querySelector(".idds");
        this.coseget = document.querySelector(".coseget");
        this.editclose = document.querySelector(".editclose");
        this.idx = null;

        this.search.style.width = "200px";
        this.selectstatus.style.width = "80px";

        this.editclose.onclick = () => {
            this.editDialog.close();
        };

        this.search.oninput = async () => {
            try {
                let response = await fetch(`${this.API}?text=${this.search.value}`);
                let data = await response.json();
                this.getData(data);
            } catch (error) {
                console.error(error);
            }
        };

        this.selectstatus.onchange = async () => {
            if (this.selectstatus.value !== "all") {
                try {
                    let response = await fetch(`${this.API}?status=${this.selectstatus.value === "true" ? true : false}`);
                    let data = await response.json();
                    this.getData(data);
                } catch (error) {
                    console.error(error);
                }
            } else {
                this.get();
            }
        };

        // Onclicks
        this.add.onclick = () => {
            this.addDialog.showModal();
        };

        this.xclose.onclick = () => {
            this.addDialog.close();
        };

        this.editxclose.onclick = () => {
            this.editDialog.close();
        };

        this.close.onclick = () => {
            this.addDialog.close();
        };

        // function add
        this.addForm.onsubmit = async (event) => {
            event.preventDefault();
            let form = event.target;
            let addUser = {
                text: form["addtext"].value,
                text1: form["addtext1"].value,
                status: form["addSelect"].value,
            };

            try {
                await fetch(this.API, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(addUser),
                });
                this.get();
            } catch (error) {
                console.error(error);
            }
        };

        this.editForm.onsubmit = async (event) => {
            event.preventDefault();
            let editText = {
                text: event.target["edittext"].value,
                text1: event.target["edittext1"].value,
            };

            try {
                await fetch(`${this.API}/${this.idx}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(editText),
                });
                this.get();
            } catch (error) {
                console.log(error);
            }
        };

        this.coseget.onclick = () => {
            this.getbyId.close();
        };
    }

    // asynchronous get data
    async get() {
        try {
            let response = await fetch(this.API);
            let data = await response.json();
            this.getData(data);
        } catch (error) {
            console.error(error);
        }
    }

    // delete function
    async DEL(id) {
        try {
            await fetch(`${this.API}/${id}`, {
                method: "DELETE",
            });
        } catch (error) {
            console.error(error);
        }
    }

    // show modal for editing
    editShowModal(element) {
        this.editDialog.showModal();
        this.editForm["edittext"].value = element.text;
        this.editForm["edittext1"].value = element.text1;
        this.idx = element.id;
    }

    // toggle status
    async editStatus(user) {
        let newStatus = {
            ...user,
            status: !user.status,
        };

        try {
            await fetch(`${this.API}/${user.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newStatus),
            });
            this.get();
        } catch (error) {
            console.log(error);
        }
    }

    // get by id
    async getById(id) {
        try {
            let response = await fetch(`${this.API}/${id}`);
            let data = await response.json();
            this.fgetById(data);
        } catch (error) {
            console.error(error);
        }
    }

    // show modal with user details
    fgetById(data) {
        this.getbyId.showModal();
        this.idd.innerHTML = data.text;
        this.idds.innerHTML = data.text1;
    }

    // get data and render
    getData(data) {
        this.trchap.innerHTML = "";
        data.forEach((e) => {
            let container = document.createElement("div");
            let text = document.createElement("p");
            let text1 = document.createElement("p");
            text.style.fontSize = "35px";
            text1.style.fontSize = "20px";
            text1.style.marginTop = "10px";
            text.innerHTML = e.text;
            text1.innerHTML = e.text1;

            let btndelete = document.createElement("button");
            let img = document.createElement("img");
            img.style.width = "20px";
            img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAb1BMVEX///8hISEAAADJycn4+PjOzs6Pj48uLi4XFxfDw8Pf398EBAStra0QEBBtbW0aGhq6urpPT08SEhLy8vJmZmaysrInJydCQkJ7e3uBgYHq6up0dHSHh4enp6cZGRnX19eYmJhcXFw1NTU+Pj5HR0e0iDzQAAAE1UlEQVR4nO3d23baMBAFUDHhDsbEXBsCaRL+/xtrU5oFCbYla0YzUue89kV72ccyklIbE1/6g/lw8fyx7fVG5/Wv4+SFe0C4GQw/AGbZKe9VyfMiAygOyz73uJAyfc0g+2u7SwGwnnAPDiFPz5D91F0zht6Re4CeGezgVOu7BLI59yA9slrDg7vzh3E04B5o12ygaPeVyWHPPdRuWYOVr0q2nXKP1j0v2/oHzKPLuOQesGvebBp4G/jNPWS3DOzv0C/iK/egXfLkDoyL2AkY043aEVgSI3ncdAaWxCgmDQ9gL99yj94iPsBy6pf/duMHLO9T6e+ovsBePuImNMcbWF5E0T8YEYBlFbkVDUEBSr6IExRgGW5IXZZYQJC6PPWKJRyvuSl1GaJdRLHrqFhEwS/gSMTiwA2pDxaR29EQHCJI3rZBIYqdLy7BIGZyX2uqIBCLX9yI5vgTc7Fz/jX+xDM3oS3eROE/gw0CkRtwzWRV+0++xICKhkxgVP+K7EkMyKhP+YN3TEX8COiozeUXPRExfw4Iqct1yYKGeFoElNTka02GhFgMA1Ie52bRiYI4Yz+AcreqRkBkX9r/tmyIT+ReqPmxLopNzJkniwcLv8jEjPdB83BlG5fIW8OapXtUIuveTO3mCyIx4zx10rC7hEfkPK7QuH2GRTwxvpS27A8iEeEpIOk+rRugKMR8F5B0H4sdXgwi31RhtYXtTyzYFhIt9+i9iVC/9kMb60MInkTYBETdxuGUhRcx47pHnY6ReBDZDu45npPpTuTaN3Q+CNSVCG8BVTfpcNKpG5HrZabTUa4uxKiAXYiRAd2J0QFdiREC3YhRAl2IkQLtidECbYlcvwhRjjTbEKMG2hAjB7YTowe2ERMANhNf432K2hJ5ggyUR0QHSiMSAGURSYCSiERAOUQyoBQiIVAGkRQogUgM5CeSA7mJAYC8xCDAiih+f9A3Ea/JWAJT+D2oQAUqUIEKVKACFahABSpQgQpUoAIVqEAFKlCBClSgAhWoQAUqUIEKVKACFahABSpQgQpUoAIVqMD/GJj8iV8FKlCBClSgAuUBO3wqOi7gNHXgS+pAM3L8XHt0wHWWOPAY6B5lA4YqId9/1LwLU0I+YKB7lA/YTx1o9kGeo4zAMI8ZRqA5FIkDg1xCTqAZBmghK9AEuIS8QLRvmksFmvdT4kD62Z4ZSH+TcgPJJ0N2oCGeKviBxMtP/EAznyUONItx4kBDeQlFAClrKAJIWUMZQMIaCgHSzYZSgGQ1lAIkq6EYIFUN5QCJaigISFNDQUCaGkoCktRQFJCihrKABDWUBSSooTAgfg2lAdFrKA6IXUNxQOwaygMi11AgELeGEoGoNZQIRK2hSCBmDWUCEWsoFIhXQ6FAvBpKBaLVUCwQq4Zcf17XHpwa5lwf+7YISg2zEdPn2m2CUUNYcyua4l/DHI7ciKb41xA+Bd+hxr+GmewLaHxrWMCe+xNorfGpYQYH2Tdole41PAEM5fuM2XSr4Rjgfck9drvs3Ws4nkF2WIqv37+c3f5EptTNFvMp96hdsk1aV+UzaV2VRfvJ54h1VY7Nz9LIdVVW9fNh9cyMXHfJ8CExFd0lu+/Hu5PSVenv4E4Xe+8eZQiz8omaJ6q7ZHVcfG7P+02Kuj8PTWa8enB2PwAAAABJRU5ErkJggg=="; 
            btndelete.appendChild(img);
            btndelete.style.border = "none";
            btndelete.style.background = "white";
            btndelete.onclick = () => {
                this.DEL(e.id);
            };

            let delcheck = document.createElement("div");
            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = e.status;
            checkbox.onclick = () => {
                this.editStatus(e);
            };

            let btnedit = document.createElement("button");
            btnedit.style.background = "white";
            btnedit.innerHTML = "Edit";
            btnedit.onclick = () => {
                this.editShowModal(e);
            };

            let btngetById = document.createElement("button");
            btngetById.innerHTML = "Info";
            btngetById.onclick = () => {
                this.getById(e.id);
            };


            container.style.border = "1px solid black"

            if (e.status == true) {
                container.style.background = "#fde98e";
            }
            if (e.status != true) {
                container.style.background = "rgb(211, 61, 61)";
                text.style.textDecoration = "line-through";
            }
            container.style.padding = "20px"
            btngetById.style.width = "40px";
            btngetById.style.height = "20px";
            delcheck.style.gap = "50px"
            delcheck.style.width = "200px"
            delcheck.style.marginTop = "10px"
            delcheck.style.display = "flex"
            delcheck.style.justifyContent = "center";
            delcheck.style.placeItems = "center"
            delcheck.style.marginTop = "80px"   
            container.style.display = "flex"
            container.style.flexDirection = "column"
            container.style.alignItems = "center"
            container.style.width = "400px"
            container.style.height = "200px"
            container.style.borderRadius = "10px"
    
            container.style.border = "1px solid black"

            delcheck.append(btndelete, btnedit, btngetById, checkbox);
            container.append(text, text1, delcheck);
            this.trchap.append(container);
        });
    }
}

new User("http://localhost:3000/data");
