# README

このリポジトリには、私、sahara581 による複数のサイトが含まれています。このリポジトリ内のファイル群は、主に制作者の学習、遊び、実用を目的としており、HTML ゲームや実用ツールなどが含まれています。

このリポジトリ内のすべてのファイルは、MITライセンスの下公開しています。ライセンスの詳細については[こちら](#chap-license)へどうぞ。

## [学園祭ホームページ](https://sahara581.github.io/site/CF/CultureFestivalTopPage.html)
学園祭用に作った広報・画像投稿サイトです。<br>
実際に学園祭で使われることはありませんでしたが、サーバーとのデータ送受信などについての勉強になりました。

## [横スクロールアクションゲーム](https://sahara581.github.io/site/PlatformerGame/index.html)
普段、Unityでゲームを作っていますが、HTMLではゲームをどれだけのものが作れるのか知りたくなり試してみました。<br>
もとから、良いゲームを作れるとは思っておらず、その予想は的中しました。
代わりに、友人の要望に基づき、自分史上最悪のゲームを作ることにしました。
#### 操作方法
画面右半分タップ : 加速
画面左半分タップ : ジャンプ
減速はできません. 加速は1.1倍です。

## [発表原稿エディタ](https://sahara581.github.io/site/Script/index.html)
完成時に印刷して本番に臨むことを前提にしています。<br>

「発表者登録」は1度に一人の発表者を入力し、都度「追加」を押してください。<br>
![](ReadMeMaterial/ScreenShot_ScirptEditor_PresenterRegistration.png)

「原稿入力」の上フォームにセクションタイトルを入力し、下フォームにその内容を入力し、「保存」でセクションを追加します。<br>
推奨：1スライドあたり1セクション<br>
![](ReadMeMaterial/ScreenShot_ScirptEditor_ManuscriptEntry.png)

The “データをJSONにエクスポート” button on the left side can be used to export data in Json format. Press the “ファイルを選択” button on the right to select the Json file you wish to import, and the selected Json file will be read. The data entered at that time will be lost, so it is recommended to make a backup of the data.

In the “セクション一覧,” registered sections are saved in the order in which they were registered, and the order can be changed by dragging. The orange “編集” button allows editing in the “原稿入力” form, and the red “削除” button deletes the section. In this case, it is recommended to make a backup with a Json file. From the pull-down menu, only one of the registered presenters can be selected.

The entered data is automatically saved in LocalStorage.<br>
When printing, the input form and buttons for each section are hidden to complete an easily visible manuscript.


## 使用技術・ツール
![HTML5](https://img.shields.io/badge/-HTML5-303030.svg?logo=html5&style=for-the-badge)
![JAVASCRIPT](https://img.shields.io/badge/-Javascript-303030.svg?logo=javascript&style=for-the-badge)
![CSS3](https://img.shields.io/badge/-Css3-303030.svg?logo=css3&style=for-the-badge)

![GitHub](https://img.shields.io/badge/-GitHub-303030.svg?logo=GITHUB&style=for-the-badge)
![Visual Studio Code](https://img.shields.io/badge/-VISUAL_STUDIO_CODE-303030.svg?logo=VSCode&style=for-the-badge)


<a name="chap-license"></a>
## ライセンス
MITライセンス
[LICENSE.md](../main/LICENSE)
