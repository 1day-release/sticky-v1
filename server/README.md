# Sticky Websocket

## ボード一覧取得

### リクエスト

| パラメータ | 説明 | 固定値 |
| --- | --- | --- |
| action | アクションの指定 | getBoardList |

```
{"action": "getBoardList"}
```

### レスポンス

| パラメータ | 説明 | 固定値 |
| --- | --- | --- |
| action | 指定したアクション | リクエストと同様 |
| statusCode | ステータスコード | 200 |
| data[] | ボード一覧 | data[] |
| - boardId | ボードID |  |
| - boardTitle | ボードタイトル |  |

```
{"action":"getBoardList","statusCode":200,"data":[{"boardId":"0123456789","boardTitle":"Board Title1"},{"boardId":"0123456789","boardTitle":"Board Title2"}]}
```

## ボード取得

### リクエスト

| パラメータ | 説明 | 固定値 |
| --- | --- | --- |
| action | アクションの指定 | getBoard |

```
{"action": "getBoard", "data": {"boardId": "0123456789"}}
```

### レスポンス

#### 成功(200)

| テスト | 説明 | 固定値 |
| --- | --- | --- |
| action | 指定したアクション | リクエストと同様 |
| statusCode | ステータスコード | 200 |
| data{} | ボード | data{} |  |
| - boardId | ボードID |  |
| - boardTitle | ボードタイトル |  |

```
{"action":"getBoard","statusCode":200,"data":{"boardId":"0123456789","boardTitle":"Board Title1"}}
```

#### ボード取得失敗(404)

| テスト | 説明 | 固定値 |
| --- | --- | --- |
| action | 指定したアクション | リクエストと同様 |
| statusCode | ステータスコード | 404 |

```
{"action":"getBoard","statusCode":404}
```

## ボード作成

### リクエスト

| パラメータ | 説明 | 固定値 |
| --- | --- | --- |
| action | アクション | createBoard |
| data{} | データ | data{} |
| - boardTitle | ボードタイトル |  |

```
{"action": "createBoard", "data": {"boardTitle": "Board Title"}}
```

### レスポンス

#### 成功(200)

| テスト | 説明 | 固定値 |
| --- | --- | --- |
| action | 指定したアクション | リクエストと同様 |
| statusCode | ステータスコード | 200 |

```
{"action":"createBoard","statusCode":200}
```

#### ボード作成失敗(400)

| テスト | 説明 | 固定値 |
| --- | --- | --- |
| action | 指定したアクション | リクエストと同様 |
| statusCode | ステータスコード | 400 |

```
{"action":"createBoard","statusCode":400}
```

## ボード更新

### リクエスト

| パラメータ | 説明 | 固定値 |
| --- | --- | --- |
| action | アクション | updateBoard |
| data{} | データ | data{} |
| - boardId | ボードID |  |
| - boardTitle | ボードタイトル |  |

```
{"action": "updateBoard", "data": {"boardId": "0123456789", "boardTitle": "Board Title2"}}
```

### レスポンス

#### 成功(200)

| テスト | 説明 | 固定値 |
| --- | --- | --- |
| action | 指定したアクション | リクエストと同様 |
| statusCode | ステータスコード | 200 |

```
{"action":"updateBoard","statusCode":200}
```

#### ボード取得失敗(404)

| テスト | 説明 | 固定値 |
| --- | --- | --- |
| action | 指定したアクション | リクエストと同様 |
| statusCode | ステータスコード | 404 |

```
{"action":"updateBoard","statusCode":404}
```

#### ボード更新失敗(400)

| テスト | 説明 | 固定値 |
| --- | --- | --- |
| action | 指定したアクション | リクエストと同様 |
| statusCode | ステータスコード | 400 |

```
{"action":"updateBoard","statusCode":400}
```

## ボード削除

### リクエスト

| パラメータ | 説明 | 固定値 |
| --- | --- | --- |
| action | アクション | deleteBoard |
| data{} | データ | data{} |
| - boardId | ボードID |  |

```
{"action": "deleteBoard", "data": {"boardId": "0123456789"}}
```

### レスポンス

#### 成功(200)

| テスト | 説明 | 固定値 |
| --- | --- | --- |
| action | 指定したアクション | リクエストと同様 |
| statusCode | ステータスコード | 200 |

```
{"action":"deleteBoard","statusCode":200}
```

#### ボード取得失敗(404)

| テスト | 説明 | 固定値 |
| --- | --- | --- |
| action | 指定したアクション | リクエストと同様 |
| statusCode | ステータスコード | 404 |

```
{"action":"deleteBoard","statusCode":404}
```

#### ボード削除失敗(400)

| テスト | 説明 | 固定値 |
| --- | --- | --- |
| action | 指定したアクション | リクエストと同様 |
| statusCode | ステータスコード | 400 |

```
{"action":"deleteBoard","statusCode":400}
```

## 付箋作成

### リクエスト

| パラメータ | 説明 | 固定値 |
| --- | --- | --- |
| action | アクション | createBoardSticky |
| data{} | データ | data{} |
| - boardId | ボードID |  |
| - stickyItem{} | 付箋アイテム | stikyItem{} |
| -- [Any] | 自由な構造 |  |

```
{"action": "createBoardSticky", "data": {"boardId": "0123456789", "stickyItem": {"text": "test2"}}}
```

### レスポンス

#### 成功(200)

| テスト | 説明 | 固定値 |
| --- | --- | --- |
| action | 指定したアクション | リクエストと同様 |
| statusCode | ステータスコード | 200 |

```
{"action":"createBoardSticky","statusCode":200}
```

#### ボード取得失敗(404)

| テスト | 説明 | 固定値 |
| --- | --- | --- |
| action | 指定したアクション | リクエストと同様 |
| statusCode | ステータスコード | 404 |

```
{"action":"createBoardSticky","statusCode":400}
```

#### ボード更新失敗(400)

| テスト | 説明 | 固定値 |
| --- | --- | --- |
| action | 指定したアクション | リクエストと同様 |
| statusCode | ステータスコード | 400 |

```
{"action":"createBoardSticky","statusCode":400}
```

## 付箋更新

### リクエスト

| パラメータ | 説明 | 固定値 |
| --- | --- | --- |
| action | アクション | updateBoardSticky |
| data{} | データ | data{} |
| - boardId | ボードID |  |
| - stickyItem{} | 付箋アイテム | stikyItem{} |
| -- stickyId | 付箋ID |  |
| -- positionX | 付箋のX位置(非必須) 存在しない場合は更新されない |  |
| -- positionY | 付箋のY位置(非必須) 存在しない場合は更新されない |  |
| -- [Any] | 自由な構造(全上書き) |  |

```
{"action": "updateBoardSticky", "data": {"boardId": "0123456789", "stickyItem": {"stickyId": 3, "text": "test2", "positionX": 5, "positionY": 2}}}
```

### レスポンス

#### 成功(200)

| テスト | 説明 | 固定値 |
| --- | --- | --- |
| action | 指定したアクション | リクエストと同様 |
| statusCode | ステータスコード | 200 |

```
{"action":"updateBoardSticky","statusCode":200}
```

#### ボード取得、付箋取得失敗(404)

| テスト | 説明 | 固定値 |
| --- | --- | --- |
| action | 指定したアクション | リクエストと同様 |
| statusCode | ステータスコード | 404 |

```
{"action":"updateBoardSticky","statusCode":404}
```

#### 付箋位置、ボード更新失敗(400)

| テスト | 説明 | 固定値 |
| --- | --- | --- |
| action | 指定したアクション | リクエストと同様 |
| statusCode | ステータスコード | 400 |

```
{"action":"updateBoardSticky","statusCode":400}
```

## 付箋削除

### リクエスト

| パラメータ | 説明 | 固定値 |
| --- | --- | --- |
| action | アクション | deleteBoardSticky |
| data{} | データ | data{} |
| - boardId | ボードID |  |
| - stickyItem{} | 付箋アイテム | stikyItem{} |
| -- stickyId | 付箋ID |  |

```
{"action": "deleteBoardSticky", "data": {"boardId": "0123456789", "stickyItem": {"stickyId": 2}}}
```

### レスポンス

#### 成功(200)

| テスト | 説明 | 固定値 |
| --- | --- | --- |
| action | 指定したアクション | リクエストと同様 |
| statusCode | ステータスコード | 200 |

```
{"action":"deleteBoardSticky","statusCode":200}
```

#### ボード、付箋取得失敗(404)

| テスト | 説明 | 固定値 |
| --- | --- | --- |
| action | 指定したアクション | リクエストと同様 |
| statusCode | ステータスコード | 404 |

```
{"action":"deleteBoardSticky","statusCode":404}
```

#### ボード更新失敗(400)

| テスト | 説明 | 固定値 |
| --- | --- | --- |
| action | 指定したアクション | リクエストと同様 |
| statusCode | ステータスコード | 400 |

```
{"action":"deleteBoardSticky","statusCode":400}
```