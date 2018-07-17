# sandbox-hapi-api
learning Beginning API Development with Node.js

## References

Book: https://www.packtpub.com/web-development/beginning-api-development-nodejs-video
Code: https://github.com/PacktPublishing/BuildingAPIDevelopmentwithNode.js

## What you need

- node.js
- IDE or Editor
- MySQL WorkBench

## Use packages

- Knex.js
- Hapi.js
- Lab

Chapter 1 Introduction to Node.js
-------------------------

### Summary

- Node.jsの標準的な役割
- どうやってNode.jsで事項するか
- Node.jsのモジュールシステム
- 同期的な実装方法（callback, promise, async/await)

### The Basics of Node.js

- Node.jsについての説明（イベントループ等）
- アーキテクチャの説明
- 使われているアプリケーションの種類について

### The Module System
 
- Node.jsの Module の仕組みについての説明と簡単なサンプル
- Node.jsに組み込みで入っているModule
  - assert, buffer, child_process, crypto, dns etc...

### Handy npm Commands

- npm commandについて
  - init, install, list, uninstall , outdated
  
### Local Modules

-

### Asynchronous Programming with Node.js && Promises

- Callback、Promise、await/asyncのそれぞれの説明

Chapter 2: Building the API: Part 1
-------------------------

### summary

- Hapiを使った一般的なhttp server
- GET / POST / PUT / PATCH /DELETE
- Logging and Validation(Joi)

### Building a Basic HTTP server

- httpモジュールを使用した簡易Webサーバの作成

### Setting up Hapi.js

- Hapiを使った簡易サーバーの作成
    - Hapi 16/17で基本コードにも違いがあるようだったので本家のGettingStartedから真似た
    - hello world
- ツール（insomnia)を作ったリクエストの検証
    - 後述しますがPostmanですすめました
- jsonを返すように修正する
- nodemonの使用（ファイル watch & サーバーリロードモジュール
- Loggerのセットアップ
    - [good](https://github.com/hapijs/good) / [good-console](https://github.com/hapijs/good-console) というHapi用のLoggerモジュールを使用

### Understanding Requests

- Methodの説明
  - GET / POST / PUT / DELETE / PATCH
- routeの実装
  - /todo
  - /todo/:id
  - GET/POST/PUT/PATCH/DELETE
- 今の所はDBを使わずに進行する

Chapter 2: Building the API: Part 2
-------------------------

### summary

- Knexを使ったDB
- JWT認証を使ったAPI認証
- Labを使ったAPIテスト

### Working with the DB using Knex.js

- MySQL WorkbenchでDB/Tableを作ってKnexでdb接続の初期化

### Creating a Record

- MySQL Workbenchからダミーユーザーを追加
- ダミーAPIのPOSTメソッドを実際にKnexを用いたDBへの書き込みへ修正
 
### Reading from the database

- ダミーAPIのGETメソッドを実際にKnexを用いたDBへの読み込みへ修正

### Edting a Record

- ダミーAPIのPATCH/DELETEメソッドを実際にKnexを用いたDBへの書き込みへ修正

### Clean-Up

- Joiを使った簡単なバリデーションの追加

### Authentication Your API with JWT

- JWT(Json Web Token)を使った認証の実装
- TokenからUserIdを取得してハードコーディングしていた部分を修正

### Testing Your API with Lab

- Labを使ったテスト
- gulpを使ったwatch → test実行ワークフロー

### REST API 検証ツール

- Postman
- insomnia
- Paw

がある模様。

https://qiita.com/endam/items/c55a792cf6ec91458096
http://tech.connehito.com/entry/2017/05/02/152238

機能的に大きな違いもなく、動画に出てくるinsomniaは触りましたが、
特に理由がないのでPostmanに戻りました


動画外の出来事
-----


## Hapiのバージョン

v16からv17に書けて多くのBreaking Changesがあるようなので都度都度動画のサンプルコードでは動かないシーンがある。

#＃ MySQL エラー

`ERROR! The server quit without updating PID file`

権限の修正やファイル作ってみる、等は試しても解決しなかった
brew install mysql (v8) が High Sierraしかだめっぽかったのでxcode等も考えてバージョンアップ＆mysql v8にしたら解決した

## MySQL WorkbenchとDocker MySQLv8

`Authentication plugin 'caching_sha2_password' cannot be loaded: dlopen(/usr/local/mysql/lib/plugin/caching_sha2_password.so, 2): image not found`

調べてみた感じではv8にWorkbenchが対応できていない？ような印象 v5.7に落とすと動作。

## MySQL local

`docker pull mysql:5.7`
`docker run -e MYSQL_ROOT_PASSWORD=password -d -p 3306:3306 mysql:5.7`

## hapi-auth-jwtはhapiv17に対応していないし更新が止まっている

代わりにhapi-auth-jwt2を使用した
https://www.npmjs.com/package/hapi-auth-jwt2


個人的な改修
-----

## Knex
https://qiita.com/YoshiyukiKato/items/59c9ac742536d706b322
https://dev.to/aspittel/objection--knex--painless-postgresql-in-your-node-app--6n6
