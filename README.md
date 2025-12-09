
# PixelHeart: Y2K Wedding Invitation

A unique, bold, and interactive wedding invitation website featuring a Y2K grunge pixel art aesthetic and Japanese influences.

## 🚀 How to Customize

All content, images, links, and text are centralized in one file for easy editing.

1.  Open the file named **`config.ts`**.
2.  Edit the values inside the `CONFIG` object.

### Customization Guide (`config.ts`)

*   **Audio**: Change `bgmUrl` to a link to your MP3 file.
*   **Dates**: Update `weddingDate` to your actual wedding date/time (Format: YYYY-MM-DDTHH:MM:SS).
*   **Hero**: Update `marqueeText`, `title`, and background images.
*   **Location**:
    *   `placeName`: Name of the venue.
    *   `address`: Physical address.
    *   `mapEmbedUrl`: Go to Google Maps -> Share -> Embed a Map -> Copy the `src="..."` URL (just the url inside the quotes) and paste it here.
*   **Couple**: Update names, photos, "levels", class/likes (fun descriptions), and **Instagram Links**.
*   **Gallery**: Add or remove image URLs in the `gallery` array.
*   **Gift**: Update Bank Name, Account Number, and Holder Name.

## 💻 Local Development (VSCode)

1.  **Download** the project files.
2.  Open the folder in **Visual Studio Code**.
3.  Open a terminal (Terminal > New Terminal) and run:
    ```bash
    npm install
    npm start
    ```
    *(Note: Since this is a React project, you usually need Node.js installed. If you are using the AI Studio preview, it runs automatically).*

## 🌐 How to Deploy to Netlify (Free)

Netlify is the easiest way to host this for free.

### Option 1: Drag and Drop (Easiest)
1.  Run `npm run build` in your terminal to create a `dist` or `build` folder.
2.  Go to [app.netlify.com](https://app.netlify.com).
3.  Log in or Sign up.
4.  Go to the "Sites" tab.
5.  Drag and drop your `dist` (or `build`) folder into the drag-and-drop area.
6.  Your site is now online! You can change the site name in "Site Settings".

### Option 2: Via GitHub (Recommended for updates)
1.  Push this code to a GitHub repository.
2.  Log in to [Netlify](https://app.netlify.com).
3.  Click **"Add new site"** > **"Import an existing project"**.
4.  Select **GitHub**.
5.  Choose your repository.
6.  Netlify will detect the build settings automatically (Build command: `npm run build`, Publish directory: `dist`).
7.  Click **Deploy**.

## 🔗 Guest Name Customization

To send a personalized invite to a guest, simply add `?to=Name` at the end of your website URL.

**Example:**
`https://your-wedding-site.com/?to=Budi`

The opening screen will display "To: Budi".
