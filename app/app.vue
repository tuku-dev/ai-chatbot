<script setup lang="ts">
type Message = {
  role: 'user' | 'assistant'
  content: string
}

const message = ref('')
const messages = ref<Message[]>([])
const loading = ref(false)

async function sendMessage() {
  if (!message.value.trim() || loading.value) return

  messages.value.push({
    role: 'user',
    content: message.value
  })

  message.value = ''
  loading.value = true

  try {
    const response = await $fetch<{ message: Message }>('/api/chat', {
      method: 'POST',
      body: { messages: messages.value }
    })

    messages.value.push(response.message)
  } catch {
    messages.value.push({
      role: 'assistant',
      content: 'Sorry, something went wrong.'
    })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main>
    <h1>Tuku AI</h1>

    <div v-for="(item, index) in messages" :key="index">
      <strong>{{ item.role === 'user' ? 'You' : 'AI' }}:</strong>
      {{ item.content }}
    </div>

    <input
      v-model="message"
      placeholder="Ask something..."
      @keyup.enter="sendMessage"
    >

    <button :disabled="loading" @click="sendMessage">
      {{ loading ? 'Thinking...' : 'Send' }}
    </button>
  </main>
</template>