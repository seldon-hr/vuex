const BASE_URL = 'https://jsonplaceholder.typicode.com/';

export const login = async (itemRequestLogin) => {
    try {
        const response = await fetch(`${BASE_URL}users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(itemRequestLogin),
        });

        if (!response.ok) {
            throw new Error('Failed to login');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}


export const gettingUsers = async () => {
    const res = await fetch(`${BASE_URL}users`);
    const data = await res.json();
    return data;
}


