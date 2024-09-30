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
#### Operate
Tap the right half of the screen : Acceleration
Tap the left half of the screen : Jump
Deceleration is not possible. When accelerated, the speed increases by a factor of 1.1.

## [Script Editor](https://sahara581.github.io/site/Script/index.html)
It is assumed to be printed upon completion.<br>

Enter one presenter at a time in the “発表者登録(Presenter Registration)” section and add each by clicking the “追加(Add)” button to the right.<br>
![](ReadMeMaterial/ScreenShot_ScirptEditor_PresenterRegistration.png)

Enter the section title in the upper form of “原稿入力(Manuscript Entry)” and the content in the lower form, then click the “保存(Save)” button to add the section.
Recommended : 1 section per slide.<br>
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
