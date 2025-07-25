# MixMaster PVP ⚔️

&nbsp;

## 💻 How API database works?

Project data was hosted on [mockapi.io](https://mockapi.io/) during staging development. Free plataform plans offers two endpoints. For now, create multiple accounts if you need to run database.

Please update `.env` variables.

| Name      | Value                                                | API endpoints         |
| --------- | ---------------------------------------------------- | --------------------- |
| API_URL_1 | https://**your-project-secret**.mockapi.io/apipvp/v1 | `/menus` `/changelog` |
| API_URL_2 | https://**your-project-secret**.mockapi.io/apipvp/v1 | `/rankpvp` `ranksa`   |

Example `.env` file:

```
API_URL_1="https://123456789.mockapi.io/apipvp/v1"
API_URL_2="https://123456789.mockapi.io/apipvp/v1"
```

Schemas structure JSON:

<details>
  <summary>Menus</summary>

  ```
  id: number
  title: string
  url: string
  created_at: string
  ```
</details>

<details>
  <summary>Changelog</summary>

  ```
  id: number
  title: string
  image_src: string
  content1: string
  content2: string
  created_at: string
  slug: string
  ```
</details>

<details>
  <summary>RankPVP</summary>

  ```
  id: number
  kills: string
  player: string
  guild: string
  created_at: string
  ```
</details>

<details>
  <summary>RankSA</summary>

  ```
  id: number
  castles: string
  master: string
  guild: string
  created_at: string
  ```
</details>

&nbsp;

## ▶️ How to run?

| Command       | Action                                    |
| ------------- | ----------------------------------------- |
| `npm run dev` | start staging on [`http://localhost:3000/`](#) |