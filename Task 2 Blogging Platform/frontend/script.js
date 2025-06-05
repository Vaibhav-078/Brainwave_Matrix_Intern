// frontend/script.js

// API Base URL (adjust if your backend is on a different port/host)
const API_BASE_URL = 'http://localhost:5000';

// Page Elements
const pages = ['home-page', 'single-post-page', 'create-post-page', 'login-page', 'register-page', 'my-blog-posts-page'];
const homePage = document.getElementById('home-page');
const singlePostPage = document.getElementById('single-post-page');
const createPostPage = document.getElementById('create-post-page');
const loginPage = document.getElementById('login-page');
const registerPage = document.getElementById('register-page');
const myBlogPostsPage = document.getElementById('my-blog-posts-page');

// Nav Elements
const navToggle = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const authNavItem = document.getElementById('auth-nav-item');
const desktopAuthNavItem = document.getElementById('desktop-auth-nav-item');
const myBlogsNav = document.getElementById('my-blogs-nav');
const desktopMyBlogsNav = document.getElementById('desktop-my-blogs-nav');
const homeNavLinks = document.querySelectorAll('.home-nav-link');
const myBlogsNavLinks = document.querySelectorAll('.my-blogs-nav-link');

// Home Page Elements
const blogPostsContainer = document.getElementById('blog-posts-container');
const searchInput = document.getElementById('search-input');
const categoryFilter = document.getElementById('category-filter');
const applyFilterBtn = document.getElementById('apply-filter-btn');

// Single Post Page Elements
const blogPostTitle = document.getElementById('blog-post-title');
const blogPostDate = document.getElementById('blog-post-date'); // This might not be used directly anymore if you inject it into blogPostContent
const blogPostCategory = document.getElementById('blog-post-category'); // This might not be used directly anymore
const blogPostContent = document.getElementById('blog-post-content');
const backToPostsBtn = document.getElementById('back-to-posts-btn');
const commentsContainer = document.getElementById('comments-container');
const commentContentInput = document.getElementById('comment-content-input');
const addCommentBtn = document.getElementById('add-comment-btn');
const currentPostId = document.getElementById('current-post-id');

// Create/Edit Post Elements
const postForm = document.getElementById('post-form');
const postTitleInput = document.getElementById('post-title');
const postContentInput = document.getElementById('post-content');
const postCategoryInput = document.getElementById('post-category');
const postIdInput = document.getElementById('post-id');
const formTitle = document.getElementById('form-title');
const postSubmitBtn = document.getElementById('post-submit-btn');

// Login Elements
const loginForm = document.getElementById('login-form');
const loginEmailInput = document.getElementById('login-email');
const loginPasswordInput = document.getElementById('login-password');

// Register Elements
const registerForm = document.getElementById('register-form');
const registerNameInput = document.getElementById('register-name');
const registerEmailInput = document.getElementById('register-email');
const registerPasswordInput = document.getElementById('register-password');
const registerConfirmPasswordInput = document.getElementById('register-confirm-password');

// My Blog Posts Elements
const myBlogPostsContainer = document.getElementById('my-blog-posts-container');
const createNewPostOnMyBlogsBtn = document.getElementById('create-new-post-on-myblogs');

// Notification Element
const notification = document.getElementById('notification');

// --- Utility Functions ---
function showPage(pageId) {
    pages.forEach(id => {
        const pageElement = document.getElementById(id);
        if (pageElement) {
            pageElement.classList.add('hidden');
        } else {
            console.warn(`showPage: Element with ID '${id}' not found.`);
        }
    });
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.remove('hidden');
    } else {
        console.error(`showPage: Target page with ID '${pageId}' not found.`);
        document.getElementById('home-page')?.classList.remove('hidden');
    }
    mobileMenu?.classList.add('hidden');
    navToggle?.setAttribute('aria-expanded', 'false');
}

function showNotification(message, type = 'info') {
    if (!notification) {
        console.warn('Notification element not found. Cannot show notification:', message);
        return;
    }
    notification.textContent = message;
    notification.className = 'fixed bottom-4 right-4 p-3 rounded-lg shadow-lg text-white z-50';
    if (type === 'success') {
        notification.classList.add('bg-green-500');
    } else if (type === 'error') {
        notification.classList.add('bg-red-500');
    } else {
        notification.classList.add('bg-blue-500');
    }
    notification.classList.remove('hidden');
    setTimeout(() => {
        notification.classList.add('hidden');
    }, 3000);
}

// --- Authentication Functions ---
function updateAuthUI() {
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');
    const token = localStorage.getItem('token');

    const elementsToToggle = [myBlogsNav, desktopMyBlogsNav];

    if (userName && token) {
        // Logged In
        if (authNavItem) authNavItem.innerHTML = `<a href="#" id="logout-link" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">Logout</a>`;
        if (desktopAuthNavItem) desktopAuthNavItem.innerHTML = `
            <div class="flex flex-col items-center md:items-end">
                <span class="text-gray-900 text-sm font-medium">Welcome, ${userName || ''}</span>
                <span class="text-gray-500 text-xs">${userEmail || ''}</span>
            </div>
            <button id="desktop-logout-link" class="ml-0 mt-1 md:mt-0 md:ml-2 bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-sm">Logout</button>
        `;

        elementsToToggle.forEach(el => el?.classList.remove('hidden'));

        document.getElementById('logout-link')?.addEventListener('click', logoutUser);
        document.getElementById('desktop-logout-link')?.addEventListener('click', logoutUser);

    } else {
        // Logged Out
        if (authNavItem) authNavItem.innerHTML = `<a href="#" id="login-link" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">Login</a>
                                             <a href="#" id="register-link" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">Register</a>`;
        if (desktopAuthNavItem) desktopAuthNavItem.innerHTML = `<button id="desktop-login-link" class="text-gray-900 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100">Login</button>
                                                <button id="desktop-register-link" class="text-gray-900 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100">Register</button>`;

        elementsToToggle.forEach(el => el?.classList.add('hidden'));

        document.getElementById('login-link')?.addEventListener('click', () => showPage('login-page'));
        document.getElementById('register-link')?.addEventListener('click', () => showPage('register-page'));
        document.getElementById('desktop-login-link')?.addEventListener('click', () => showPage('login-page'));
        document.getElementById('desktop-register-link')?.addEventListener('click', () => showPage('register-page'));
    }
}

async function handleAuthResponse(response, isLogin = false) {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: `${isLogin ? 'Login' : 'Operation'} failed and error response was not valid JSON.` }));
        throw new Error(errorData.message || `${isLogin ? 'Login' : 'Operation'} failed`);
    }
    const data = await response.json();
    localStorage.setItem('token', data.token);
    localStorage.setItem('userName', data.name);
    localStorage.setItem('userEmail', data.email);
    updateAuthUI();
    showNotification(`${isLogin ? 'Login' : 'Registration'} successful!`, 'success');
    showPage('home-page');
    loadAllPosts();
}

// User Login
async function loginUser(event) {
    event.preventDefault();
    const email = loginEmailInput.value;
    const password = loginPasswordInput.value;

    try {
        const response = await fetch(`${API_BASE_URL}/api/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        await handleAuthResponse(response, true);
    } catch (error) {
        showNotification(error.message, 'error');
        console.error('Login error:', error);
    }
}

// User Registration
async function registerUser(event) {
    event.preventDefault();
    const name = registerNameInput.value;
    const email = registerEmailInput.value;
    const password = registerPasswordInput.value;
    const confirmPassword = registerConfirmPasswordInput.value;

    if (password !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });
        await handleAuthResponse(response, false);
    } catch (error) {
        showNotification(error.message, 'error');
        console.error('Registration error:', error);
    }
}

// User Logout
async function logoutUser(event) {
    if (event) event.preventDefault();
    const performClientLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        updateAuthUI();
        showPage('home-page');
        loadAllPosts();
    };

    try {
        const response = await fetch(`${API_BASE_URL}/api/users/logout`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Logout API call failed');
        }
        showNotification('Logged out successfully!', 'success');
    } catch (error) {
        console.error('Logout API error:', error.message);
        showNotification('Logout completed locally. API sync issue.', 'error');
    } finally {
        performClientLogout();
    }
}


// --- Blog Post Functions ---

// Load All Posts
async function loadAllPosts() {
    if (!blogPostsContainer) return;
    blogPostsContainer.innerHTML = '<p class="text-center text-gray-500">Loading posts...</p>';
    const searchTerm = searchInput?.value || '';
    const category = categoryFilter?.value || '';
    const queryParams = new URLSearchParams();
    if (searchTerm) queryParams.append('search', searchTerm);
    if (category) queryParams.append('category', category);

    try {
        const response = await fetch(`${API_BASE_URL}/api/posts?${queryParams.toString()}`);
        if (!response.ok) throw new Error('Failed to fetch posts');
        const posts = await response.json();
        blogPostsContainer.innerHTML = '';

        if (posts.length === 0) {
            blogPostsContainer.innerHTML = '<p class="text-center text-gray-500">No posts found.</p>';
            return;
        }

        posts.forEach(post => {
            const postCard = document.createElement('div');
            postCard.classList.add('bg-white', 'rounded-lg', 'shadow-sm', 'p-6', 'flex', 'flex-col', 'justify-between', 'transform', 'transition-all', 'duration-300', 'hover:scale-[1.02]', 'cursor-pointer', 'blog-post-card'); // Added 'blog-post-card'
            postCard.dataset.postId = post._id;
            postCard.innerHTML = `
                <div>
                    <span class="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800 mb-2">${post.category || 'Uncategorized'}</span>
                    <h3 class="text-xl font-semibold text-gray-900 mb-2">${post.title}</h3>
                    <p class="text-gray-600 text-sm mb-3 truncate-3-lines">${post.content}</p>
                </div>
                <div class="flex items-center text-sm text-gray-500 mt-4">
                    <img class="h-8 w-8 rounded-full mr-2" src="https://ui-avatars.com/api/?name=${encodeURIComponent(post.author?.name || 'Unknown')}&background=random" alt="${post.author?.name || 'Unknown'} avatar">
                    <span class="font-medium text-gray-700">${post.author?.name || 'Unknown Author'}</span>
                    <span class="mx-2">&bull;</span>
                    <span>${new Date(post.createdAt).toLocaleDateString()}</span>
                    <span class="ml-4 flex items-center">
                        <i data-feather="message-circle" class="w-4 h-4 mr-1 text-gray-400"></i>
                        <span>${post.commentsCount || 0}</span>
                    </span>
                </div>`;
            blogPostsContainer.appendChild(postCard);
            postCard.addEventListener('click', () => {
                console.log('Post card clicked! Post ID:', postCard.dataset.postId); // Debug line
                viewSinglePost(postCard.dataset.postId);
            });
        });
        if (typeof feather !== 'undefined') feather.replace();
    } catch (error) {
        showNotification(error.message, 'error');
        console.error('Error loading posts:', error);
        blogPostsContainer.innerHTML = '<p class="text-center text-red-500">Failed to load posts. Please try again later.</p>';
    }
}

// Load My Posts
async function loadMyPosts() {
    if (!myBlogPostsContainer) return;
    myBlogPostsContainer.innerHTML = '<p class="text-center text-gray-500">Loading your posts...</p>';
    const token = localStorage.getItem('token');
    if (!token) {
        showNotification('Please login to view your posts', 'info');
        showPage('login-page');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/posts/my`, { headers: { 'Authorization': `Bearer ${token}` } });
        if (!response.ok) {
            if (response.status === 401) {
                showNotification('Session expired. Please login again.', 'error');
                logoutUser();
            } else {
                const errorData = await response.json().catch(() => ({ message: 'Failed to fetch your posts' }));
                throw new Error(errorData.message);
            }
            return;
        }
        const posts = await response.json();
        myBlogPostsContainer.innerHTML = '';

        if (posts.length === 0) {
            myBlogPostsContainer.innerHTML = '<p class="text-center text-gray-500">You have not created any posts yet.</p>';
            return;
        }

        posts.forEach(post => {
            const postCard = document.createElement('div');
            postCard.classList.add('bg-white', 'rounded-lg', 'shadow-sm', 'p-6', 'flex', 'flex-col', 'justify-between');
            postCard.dataset.postId = post._id;
            postCard.innerHTML = `
                <div class="cursor-pointer transform transition-all duration-300 hover:scale-[1.02]" data-action="view">
                    <span class="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800 mb-2">${post.category || 'Uncategorized'}</span>
                    <h3 class="text-xl font-semibold text-gray-900 mb-2">${post.title}</h3>
                    <p class="text-gray-600 text-sm mb-3 truncate-3-lines">${post.content}</p>
                </div>
                <div class="flex items-center text-sm text-gray-500 mt-4">
                    <img class="h-8 w-8 rounded-full mr-2" src="https://ui-avatars.com/api/?name=${encodeURIComponent(post.author?.name || 'Unknown')}&background=random" alt="${post.author?.name || 'Unknown'} avatar">
                    <span class="font-medium text-gray-700">${post.author?.name || 'Unknown Author'}</span>
                    <span class="mx-2">&bull;</span>
                    <span>${new Date(post.createdAt).toLocaleDateString()}</span>
                    <span class="ml-4 flex items-center">
                        <i data-feather="message-circle" class="w-4 h-4 mr-1 text-gray-400"></i>
                        <span>${post.commentsCount || 0}</span>
                    </span>
                </div>
                <div class="mt-4 flex space-x-2">
                    <button class="text-green-600 hover:text-green-800 self-start edit-post-button" data-post-id="${post._id}">Edit</button>
                    <button class="text-red-600 hover:text-red-800 self-start delete-post-button" data-post-id="${post._id}">Delete</button>
                </div>`;
            myBlogPostsContainer.appendChild(postCard);

            postCard.querySelector('[data-action="view"]')?.addEventListener('click', () => viewSinglePost(post._id));
            postCard.querySelector('.edit-post-button')?.addEventListener('click', (e) => editPost(e.target.dataset.postId));
            postCard.querySelector('.delete-post-button')?.addEventListener('click', (e) => deletePost(e.target.dataset.postId));
        });
        if (typeof feather !== 'undefined') feather.replace();
    } catch (error) {
        showNotification(error.message, 'error');
        console.error('Error loading my posts:', error);
        myBlogPostsContainer.innerHTML = '<p class="text-center text-red-500">Failed to load your posts. Please try again later.</p>';
    }
}

// View Single Post
async function viewSinglePost(postId) {
    if (!blogPostContent || !commentsContainer || !blogPostTitle || !currentPostId) {
        console.error('Missing required elements for single post page:', { blogPostContent, commentsContainer, blogPostTitle, currentPostId });
        return;
    }
    showPage('single-post-page');
    currentPostId.value = postId;

    blogPostTitle.textContent = 'Loading...';
    blogPostContent.innerHTML = '<p class="text-center text-gray-500">Loading post details...</p>';
    commentsContainer.innerHTML = '';


    try {
        const response = await fetch(`${API_BASE_URL}/api/posts/${postId}`);
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to fetch post details' }));
            throw new Error(errorData.message);
        }
        const post = await response.json();
        const formattedContent = post.content.replace(/\n/g, '<br>');

        blogPostTitle.textContent = post.title;
        blogPostContent.innerHTML = `
            <div class="flex items-center text-sm text-gray-500 mb-6">
                <img class="h-8 w-8 rounded-full mr-2" src="https://ui-avatars.com/api/?name=${encodeURIComponent(post.author?.name || 'Unknown')}&background=random" alt="${post.author?.name || 'Unknown'} avatar">
                <span class="font-medium text-gray-700">${post.author?.name || 'Unknown Author'}</span>
                <span class="mx-2">&bull;</span>
                <span class="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800 mr-2">${post.category || 'Uncategorized'}</span>
                <span class="mx-2">&bull;</span>
                <span>${new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
            <div class="prose max-w-none text-gray-800 leading-relaxed blog-content">
                ${formattedContent}
            </div>`;
        loadComments(postId);
    } catch (error) {
        showNotification(error.message, 'error');
        console.error('Error viewing post:', error);
        blogPostContent.innerHTML = '<p class="text-center text-red-500">Failed to load post. Please try again.</p>';
    }
}

// Create/Edit Post
async function submitPost(event) {
    event.preventDefault();
    if (!postForm || !postIdInput || !postTitleInput || !postContentInput || !postCategoryInput || !formTitle || !postSubmitBtn) return;

    const currentPostIdValue = postIdInput.value;
    const method = currentPostIdValue ? 'PUT' : 'POST';
    const url = currentPostIdValue ? `${API_BASE_URL}/api/posts/${currentPostIdValue}` : `${API_BASE_URL}/api/posts`;
    const token = localStorage.getItem('token');

    if (!token) {
        showNotification('You must be logged in to create/edit posts.', 'error');
        showPage('login-page');
        return;
    }

    try {
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({
                title: postTitleInput.value,
                content: postContentInput.value,
                category: postCategoryInput.value
            }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: `Failed to ${currentPostIdValue ? 'update' : 'create'} post` }));
            if (response.status === 401) {
                showNotification('Unauthorized. Please login again.', 'error');
                logoutUser();
            }
            throw new Error(errorData.message);
        }

        showNotification(`Post ${currentPostIdValue ? 'updated' : 'created'} successfully!`, 'success');
        showPage('my-blog-posts-page');
        loadMyPosts();
        loadAllPosts();
        postForm.reset();
        postIdInput.value = '';
        formTitle.textContent = 'Create New Blog Post';
        postSubmitBtn.textContent = 'Create Post';
    } catch (error) {
        showNotification(error.message, 'error');
        console.error('Error submitting post:', error);
    }
}

// Edit Post
async function editPost(postIdToEdit) {
    if (!postForm || !postIdInput || !postTitleInput || !postContentInput || !postCategoryInput || !formTitle || !postSubmitBtn) return;
    showPage('create-post-page');
    formTitle.textContent = 'Edit Blog Post';
    postSubmitBtn.textContent = 'Update Post';
    postForm.reset();
    postIdInput.value = '';

    try {
        const response = await fetch(`${API_BASE_URL}/api/posts/${postIdToEdit}`);
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to fetch post for editing' }));
            throw new Error(errorData.message);
        }
        const post = await response.json();
        postTitleInput.value = post.title;
        postContentInput.value = post.content;
        postCategoryInput.value = post.category;
        postIdInput.value = post._id;
    } catch (error) {
        showNotification(error.message, 'error');
        console.error('Error loading post for edit:', error);
        showPage('my-blog-posts-page');
        loadMyPosts();
    }
}

// Delete Post
async function deletePost(postIdToDelete) {
    if (!confirm('Are you sure you want to delete this post?')) return;

    const token = localStorage.getItem('token');
    if (!token) {
        showNotification('You must be logged in to delete posts.', 'error');
        showPage('login-page');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/posts/${postIdToDelete}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to delete post' }));
            if (response.status === 401) {
                showNotification('Unauthorized. Please login again.', 'error');
                logoutUser();
            }
            throw new Error(errorData.message);
        }

        showNotification('Post deleted successfully!', 'success');
        loadMyPosts();
        loadAllPosts();
    } catch (error) {
        showNotification(error.message, 'error');
        console.error('Error deleting post:', error);
    }
}

// --- Comment Functions ---

// Load Comments
async function loadComments(postIdForComment) {
    if (!commentsContainer) return;
    commentsContainer.innerHTML = '<p class="text-center text-gray-500">Loading comments...</p>';
    try {
        const response = await fetch(`${API_BASE_URL}/api/posts/${postIdForComment}/comments`);
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to fetch comments' }));
            throw new Error(errorData.message);
        }
        const comments = await response.json();
        commentsContainer.innerHTML = '';

        if (comments.length === 0) {
            commentsContainer.innerHTML = '<p class="text-center text-gray-500">No comments yet. Be the first to comment!</p>';
            return;
        }

        comments.forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('bg-gray-50', 'p-4', 'rounded-lg', 'shadow-sm', 'mb-3');
            commentDiv.innerHTML = `
                <div class="flex items-center mb-2">
                    <img class="h-8 w-8 rounded-full mr-2" src="https://ui-avatars.com/api/?name=${encodeURIComponent(comment.author?.name || 'Anonymous')}&background=random" alt="${comment.author?.name || 'Anonymous'} avatar">
                    <span class="font-semibold text-gray-900">${comment.author?.name || 'Anonymous'}</span>
                    <span class="text-gray-500 text-sm ml-2">${new Date(comment.createdAt).toLocaleDateString()}</span>
                </div>
                <p class="text-gray-700">${comment.content}</p>`;
            commentsContainer.appendChild(commentDiv);
        });
    } catch (error) {
        showNotification(error.message, 'error');
        console.error('Error loading comments:', error);
        commentsContainer.innerHTML = '<p class="text-center text-red-500">Failed to load comments.</p>';
    }
}

// Add Comment
async function addComment(event) {
    event.preventDefault();

    console.log("Entering addComment function..."); // Debug 1

    if (!currentPostId || !commentContentInput) {
        console.error("Critical: currentPostId or commentContentInput element not found."); // Debug 2
        showNotification("Internal error: Comment elements missing.", 'error');
        return;
    }

    const postIdValue = currentPostId.value;
    const content = commentContentInput.value;
    const token = localStorage.getItem('token');

    console.log("Post ID:", postIdValue); // Debug 3
    console.log("Comment Content:", content); // Debug 4
    console.log("Token exists:", !!token); // Debug 5 (true/false)

    if (!token) {
        showNotification('You must be logged in to comment.', 'error');
        showPage('login-page');
        console.log("Stopped: No token found."); // Debug 6
        return;
    }
    if (!content.trim()) {
        showNotification('Comment cannot be empty.', 'error');
        console.log("Stopped: Comment content is empty."); // Debug 7
        return;
    }
    if (!postIdValue) {
        showNotification('Cannot add comment, post ID is missing.', 'error');
        console.log("Stopped: Post ID is missing."); // Debug 8
        return;
    }

    try {
        console.log("Attempting to fetch comment API..."); // Debug 9
        const response = await fetch(`${API_BASE_URL}/api/posts/${postIdValue}/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ content }),
        });

        if (!response.ok) {
            console.log("API response not OK:", response.status, response.statusText); // Debug 10
            const errorData = await response.json().catch(() => ({ message: 'Failed to add comment' }));
            if (response.status === 401) {
                showNotification('Unauthorized. Please login again.', 'error');
                logoutUser();
            }
            throw new Error(errorData.message);
        }

        console.log("Comment added successfully, updating UI."); // Debug 11
        showNotification('Comment added successfully!', 'success');
        commentContentInput.value = '';
        loadComments(postIdValue);
        loadAllPosts();
        loadMyPosts();
    } catch (error) {
        showNotification(error.message, 'error');
        console.error('Error adding comment:', error); // Debug 12
    }
}

// --- Event Listeners ---
document.addEventListener('DOMContentLoaded', () => {
    showPage('home-page');
    updateAuthUI();
    loadAllPosts();


    navToggle?.addEventListener('click', () => {
        mobileMenu?.classList.toggle('hidden');
        const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
        navToggle.setAttribute('aria-expanded', (!expanded).toString());
    });

    homeNavLinks.forEach(link => link.addEventListener('click', (e) => {
        e.preventDefault();
        showPage('home-page');
        loadAllPosts();
    }));

    createNewPostOnMyBlogsBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        if (postForm) postForm.reset();
        if (postIdInput) postIdInput.value = '';
        if (formTitle) formTitle.textContent = 'Create New Blog Post';
        if (postSubmitBtn) postSubmitBtn.textContent = 'Create Post';
        showPage('create-post-page');
    });

    myBlogsNavLinks.forEach(link => link.addEventListener('click', (e) => {
        e.preventDefault();
        showPage('my-blog-posts-page');
        loadMyPosts();
    }));

    loginForm?.addEventListener('submit', loginUser);
    registerForm?.addEventListener('submit', registerUser);
    postForm?.addEventListener('submit', submitPost);
if (addCommentBtn) {
    addCommentBtn.addEventListener('click', (event) => {
        console.log("Add Comment button clicked!"); // New debug line
        addComment(event);
    });
} else {
    console.error("Add Comment button (addCommentBtn) not found!"); // New debug line
}
    applyFilterBtn?.addEventListener('click', loadAllPosts);

    let searchTimeout;
    searchInput?.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            loadAllPosts();
        }, 500);
    });

    backToPostsBtn?.addEventListener('click', () => {
        showPage('home-page');
    });
});