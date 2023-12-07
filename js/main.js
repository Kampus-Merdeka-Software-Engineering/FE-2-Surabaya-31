document.addEventListener('DOMContentLoaded', function () {
    const menuLinks = document.querySelectorAll('.menu a');

    menuLinks.forEach(link => {
        link.addEventListener('click', function () {
            // Hapus kelas active dari semua tautan menu
            menuLinks.forEach(link => link.classList.remove('active'));

            // Tambahkan kelas active ke tautan yang sedang diklik
            this.classList.add('active');
        });
    });
});


// Fetch data untuk Mental Lens Website
function fetchData(pageType) {
    // Menentukan URL API berdasarkan pageType
    let apiUrl = '';

    if (pageType === 'newsEn') {
        apiUrl = 'http://localhost:3000/newsEn';
    } else if (pageType === 'newsId') {
        apiUrl = 'http://localhost:3000/newsId';
    } else if (pageType === 'cwu') {
        apiUrl = 'http://localhost:3000/cwu';
    } else if (pageType === 'feedback') {
        apiUrl = 'http://localhost:3000/feedback';
    } else {
        console.error('Invalid pageType:', pageType);
        return;
    }

    // Fetch data dari API yang sesuai dengan pageType
    fetch(apiUrl)
        .then(response => response.json())
        .then(apiData => {
            // Menampilkan data sesuai dengan pageType
            if (pageType === 'newsEn' || pageType === 'newsId') {
                displayNews(apiData, pageType);
            } else if (pageType === 'cwu') {
                displayVideo(apiData);
            } else if (pageType === 'feedback') {
                displayFeedback(apiData);
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Fungsi untuk menampilkan data berita
function displayNews(newsEnData, pageType) {
    console.log(`Displaying news (${pageType}):`, newsEnData);
}
function displayNews(newsIdData, pageType) {
    console.log(`Displaying news (${pageType}):`, newsIdData);
}

// Fungsi untuk menampilkan data video
function displayVideo(videoData) {
    console.log('Displaying video:', videoData);
}

// Fungsi untuk menampilkan data feedback
function displayFeedback(feedbackData) {
    console.log('Displaying feedback:', feedbackData);
}


document.addEventListener('DOMContentLoaded', function () {
    const feedbackForm = document.getElementById('feedbackForm');

    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function (event) {
            event.preventDefault();

            // Ambil data dari formulir
            const email = document.getElementById('email-user').value;
            const message = document.getElementById('message-user').value;

            // Validasi data user
            if (!email || !message) {
                alert('Please enter your email and feedback');
                return;
            }

            // Buat objek data
            const feedbackData = {
                email: email,
                message: message
            };

            // Kirim data sebagai JSON ke server
            fetch('http://localhost:3000/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(feedbackData),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Thank You! Your feedback has been saved');
                    feedbackForm.reset();
                } else {
                    alert('Sorry, an error occurred. Please complete the data and try again');
                }
            })
            .catch(error => console.error('Error sending feedback:', error.message)); // Menampilkan pesan kesalahan yang lebih spesifik
        });
    }
});
