const btn = document.querySelector('#btn');
const btn_delete = document.querySelector('#btn_delete');
const form = document.querySelector('#form');
const input = document.querySelector('#inp');
const list = document.querySelector('#list');

fetch(`https://jsonplaceholder.typicode.com/todos`).then((res) => res.json()).then(res => {
    let userId;
    const render = (array) => {
        list.innerHTML = '';
        for (let i = 0; i < array.length; i++) {
            const li = document.createElement('li');
            const checkbox = document.createElement('input');
            checkbox.setAttribute("type", "checkbox", "cheked");
            checkbox.checked = array[i].completed;
            li.textContent = 'id - ' + array[i].id + '; ' + 'title - ' + array[i].title + '; ' + '  complited - ' + array[i].completed;
            list.append(li);
            li.append(checkbox);
            userId = array[i].userId + 1;
            checkbox.addEventListener('click', () => {
                checkTodo(i);
            });

            if (array[i].completed == true) {
                li.style.color = 'green'
                // console.log(array[i])
            }
        }
    };
    render(res);

    function patchUser(id, completed) {
        fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: "PATCH",
                body: JSON.stringify({
                    completed: !completed
                }),
                headers: {
                    'Content-type': 'application/json'
                }
            })
            .then(res => res.json())
            .then((data) => {
                console.log(data)
            })
    }

    function deleteUser(id) {
        fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            method: "DELETE"
        }).then(res => {
            if (id == Number(id)) {
                console.log(`Пользователь с id ${id} успешно удален`)
            }
        }).catch(err => {
            console.log(err);
        })
    }

    btn_del.addEventListener('click', () => {
        deleteUser(input.value)
        input.value = ''
    })
    console.log(typeof (input.value))

    function postUser() {
        fetch('https://jsonplaceholder.typicode.com/todos', {
                method: "POST",
                body: JSON.stringify({
                    userId: userId,
                    title: input.value,
                    completed: false,
                }),
                headers: {
                    "Content-type": "application/json"
                },
            })
            .then(res => res.json())
            .then((data) => {
                console.log(data);
            }).catch(err => {
                console.log(err)
            })
    }

    btn.addEventListener('click', () => {
        postUser(input.value)
        input.value = ''
    })

    form.addEventListener('submit', (e) => {
        e.preventDefault();
    });

    const checkTodo = (index) => {
        res[index].completed = !res[index].completed;
        render(res);
    };
})