document.getElementById('resumeForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        jobRole: formData.get('jobRole'),
        industry: formData.get('industry')
    };

    try {
        const response = await fetch('/functions/api/handler.ts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        alert('Resume generated successfully!');
        // Process the result further as needed
    } catch (error) {
        console.error('Error generating resume:', error);
        alert('There was an error generating the resume. Please try again later.');
    }
});