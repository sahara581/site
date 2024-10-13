# README

Engilish version [here](https://github.com/sahara581/site/blob/main/README.md).

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
![](ReSources/Images/ReadMeMaterial/ScreenShot_ScirptEditor_PresenterRegistration.png)

「原稿入力」の上フォームにセクションタイトルを入力し、下フォームにその内容を入力し、「保存」でセクションを追加します。<br>
推奨：1スライドあたり1セクション<br>
![](ReSources/Images/ReadMeMaterial/ScreenShot_ScirptEditor_ManuscriptEntry.png)

「データ管理」の「データをJSONにエクスポート」からJson形式でデータをエクスポートできます。「ファイルを選択」からインポートしたいJsonファイルを選択すると、選択したファイルが読み込まれます。その際に入力されていたデータは失われるため、バックアップを取っておくことをおすすめします。

「セクション一覧」では登録済セクションが登録順に表示され、ドラッグで順番を入れ替えられます。「編集」からは「原稿入力」での編集、「削除」からはセクションの削除が可能です。削除する場合は万一に備えJsonファイルのバックアップを取っておくことをおすすめします。プルダウンメニューからは登録済発表者のうち1人のみを選択できます。

入力されたデータはLocalStorageに自動で保存されます。<br>
印刷時には各セクションの入力フォームやボタン等が非表示になり、見やすい原稿が完成します。


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

## 作品
[サービスリンク集](https://sahara581.github.io/site/services/index.html)
