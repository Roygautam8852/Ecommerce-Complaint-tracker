const form = document.getElementById('issueForm');
        const messageDiv = document.getElementById('message');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = {
                customerName: document.getElementById('customerName').value,
                email: document.getElementById('email').value,
                orderId: document.getElementById('orderId').value,
                orderDate: document.getElementById('orderDate').value,
                productName: document.getElementById('productName').value,
                purchaseAmount: parseFloat(document.getElementById('purchaseAmount').value) || 0,
                category: document.getElementById('category').value,
                issueDescription: document.getElementById('issueDescription').value
            };

            try {
                const response = await fetch('http://localhost:3001/issues', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();

                if (response.ok) {
                    messageDiv.className = 'message success';
                    // Use user-friendly issueId if present, else fallback to _id
                    const trackingId = data.issueId || data._id;
                    messageDiv.textContent = `Issue submitted successfully! Your tracking ID is: ${trackingId}`;
                    form.reset();
                    setTimeout(() => {
                        messageDiv.textContent = '';
                        messageDiv.className = 'message';
                    }, 5000);
                } else {
                    messageDiv.className = 'message error';
                    messageDiv.textContent = (data.message || 'Error submitting issue');
                }
            } catch (error) {
                messageDiv.className = 'message error';
                messageDiv.textContent = 'Error connecting to server';
            }
        });