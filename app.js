function extractGroupUsers() {
    const groupSubtitle = document.querySelector("[data-testid='chat-subtitle']")

    if (!groupSubtitle) {
      throw new Error('No chat subtitle found. Please open a group chat.')
    }

    // Check if users are separated with '，' (Chinese) or ',' (English)
    const separator = groupSubtitle.textContent.includes('，') ? '，' : ','

    let groupUsers = groupSubtitle.textContent.split(separator)

    groupUsers = groupUsers.map((user) => user.trim())

    if (groupUsers.length === 1) {
      throw new Error(
        'No users found in the group chat. Please wait a second and try again.' +
          'If the error persists, it might be that your Locale is not supported. Please open an issue on GitHub.'
      )
    }

    // Remove unnecessary text
    groupUsers = groupUsers.filter(
      (user) =>
        [
          'You', // English
          '您', // Chinese
          'あなた', // Japanese
          'आप', // Hindi
          'Tu', // Spanish
          'Vous', // French
          'Du', // German
          'Jij', // Dutch
          'Você', // Portuguese
          'Вы' // Russian
        ].includes(user) === false
    )

    // Normalize user's names without accents or special characters
    return groupUsers.map((user) => user.normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
  }
  
async function tagEveryone() {
    const groupUsers = extractGroupUsers()

    const chatInput = document.querySelector("[data-testid='conversation-compose-box-input'] > p")

    if (!chatInput) {
      throw new Error('No chat input found. Please type a letter in the chat input.')
    }

    for (const user of groupUsers) {
      document.execCommand('insertText', false, `@${user}`)

      // await waitForElement("[data-testid='contact-mention-list-item']")
      await sleep(300)

      // Send "tab" key to autocomplete the user
      const keyboardEvent = new KeyboardEvent('keydown', {
        key: 'Tab',
        code: 'Tab',
        keyCode: 9,
        which: 9,
        bubbles: true,
        cancelable: true,
        view: window
      })

      chatInput.dispatchEvent(keyboardEvent)

      document.execCommand('insertText', false, ' ')
    }
  }

tagEveryone();