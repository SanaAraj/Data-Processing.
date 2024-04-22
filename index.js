//console.log("Hello via Bun!");
export default {
    port:3000,
    fetch(request) {
        return new Response("Welcome to bun")
    },
};