<template>
    <nav class="nav">
        <router-link to="/index">
            Both chats
        </router-link>
        <router-link to="/rest-chat">
            Rest chat
        </router-link>
        <router-link to="/websocket-chat">
            Websocket chat
        </router-link>
    </nav>
</template>

<style scoped>
.nav {
    display: block;
    position: fixed;
    left: 0;
    top: 0;
    width: 160px;
    height: 100vh;
    gap: 20px;
    margin-bottom: 30px;
    padding: 16px;
    background: #E6E6E6;
}

.nav a {
    display: block;
    text-decoration: none;
    color: #333;
    font-weight: bold;
    padding: 8px 16px;
    border-radius: 4px;
    transition: background 0.2s;
    margin-bottom: 16px;
}

.nav a:hover,
.nav a.router-link-active {
    background: #007bff;
    color: white;
}
</style>