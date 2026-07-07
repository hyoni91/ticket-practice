

## 🎫 Ticket Practice App

### 概要

韓国のコンサートチケット予約を想定した練習用Webアプリです。

BTSをはじめとする人気アーティストのチケットは数秒で完売することも多いため、実際のチケット争奪戦に近い環境で座席選択の練習ができるように開発しました。

Botチェックを通過した後、制限時間内に空いている座席を素早く選択することで、実際のチケット予約に近い体験ができます。

---

## 🛠 Tech Stack

* Next.js
* React
* TypeScript
* Tailwind CSS

---

## ✨ Features

* タイマーを利用したチケット予約シミュレーション
* Reactコンポーネントによる座席レイアウトの構築
* CSS Gridを利用した座席配置
* 時間経過に応じてSoldOut率が上昇する座席シミュレーション
* Botチェック後にゲーム開始
* 座席の状態管理（available / selected / taken）

---

## 💡 Implementation

* `Seat`コンポーネントで1つの座席を管理
* `SeatGrid`コンポーネントで座席をGridレイアウトとして描画
* `Page`コンポーネントでゲーム全体の状態を管理
* `useEffect`と`setInterval`を利用し、時間経過とともに座席が徐々にSoldOutになる仕組みを実装
* `useState`を利用してゲームの成功・失敗や座席状態を管理

---

## 🌐 Demo

実際にアプリを体験できます。

🔗 [ticket-practice](https://ticket-practice-mu.vercel.app/)
