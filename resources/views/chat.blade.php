<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="csrf-token" content="{{ csrf_token() }}">
	<title>Chat with Laravel - VueJs</title>
	<link rel="stylesheet" type="text/css" href="{{ mix('css/app.css') }}">
	<style>
		.list-group {
			overflow-y: scroll;
			height: 200px;
		}
	</style>
</head>
<body>
	<div class="container">
		<div id="app" class="row">
			<div class="offset-4 col-4 offset-sm-1 col-sm-10">
				<span class="list-group-item active">Chat Room <span class="badge badge-pill badge-warning">@{{numberOfUsers}}</span></span>
				<div class="badge badge-pill badge-primary">@{{typing}}</div>
				<ul class="list-group" v-chat-scroll>
					<message v-for="value, index in chat.message" :value="value" :user="chat.user[index]" :key="value.index" :color="chat.color[index]" :time="chat.time[index]"></message>
				</ul>
				<input type="text" class="form-control" v-model="message" @keyup.enter="send" placeholder="Type your message here...">
				<br>
				<a class="btn btn-danger btn-sm" @click="deleteSession">Clean chats</a>
			</div>
		</div>
	</div>
	<script src="{{ mix('js/app.js') }}"></script>
</body>
</html>