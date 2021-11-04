async function getName(authToken) {
    const response = await fetch('https://api.blooket.com/api/users/verify-token?token=JWT+' + authToken);
    const data = await response.json();

    return data.name
};

async function addTokens() {
    const add_tokens = Number(prompt('How many tokens do you want to add to your account? (400000 daily)'));
    const myToken = localStorage.token.split('JWT ')[1];

    if (add_tokens > 400000) {
        alert('You can add up to 400000 tokens daily')
    }

    const response = await fetch('https://api.blooket.com/api/users/add-rewards', {
        method: "PUT",
        headers: {
            "referer": "https://www.blooket.com/",
            "content-type": "application/json",
            "authorization": localStorage.token
        },
        body: JSON.stringify({
            addedTokens: add_tokens,
            addedXp: 400000,
            name: await getName(myToken)
        })
    });

    if (response.status == 360000) {
        alert(`${add_tokens} added to your account!`);
    } else {
        alert('An error occured.');
    };

};

addTokens();
