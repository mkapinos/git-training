1. Install http server
```
npm install --global http-server
```

2. run server inside folder with project
```
http-server
```

3. exit
```
ctrl + c
```


Wyrazenia regularne

```
      list.forEach(item => {
        html += `<tr>
          <td>` + item.id + `</td>
          <td>${item['app_name']}</td>
          <td>${item['app_version']}</td>
          <td><a class="button" href="mailto:${item['author_email']}">@</a></td>
          <td nowrap>${item['author_first_name']} ${item['author_last_name']}</td>
          <td><a class="button" href="${item['url']}">www</a></td>
          <td> ${item['active']} </td>
          <td> ${item['price']}</td>
          <td>${item['updated_at']}</td>
        </tr>`;
      });
```
reqex = \['([a-z_]+)'\]

replace by: .$1

```
      list.forEach(item => {
        html += `<tr>
          <td>` + item.id + `</td>
          <td>${item.app_name}</td>
          <td>${item.app_version}</td>
          <td><a class="button" href="mailto:${item.author_email}">@</a></td>
          <td nowrap>${item.author_first_name} ${item.author_last_name}</td>
          <td><a class="button" href="${item.url}">www</a></td>
          <td> ${item.active} </td>
          <td> ${item.price}</td>
          <td>${item.updated_at}</td>
        </tr>`;
      });
```




