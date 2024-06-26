# Video Notes

A simple web application that allows users to watch YouTube videos and take timestamped notes. Built with Next.js, React, and Tailwind CSS.

## Getting Started

### Installation

First, clone the repository:

```bash
git clone https://github.com/your-username/video-notes.git
cd video-notes
```

Install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### Environment Variables

Create a `.env.local` file in the root directory and add your YouTube Data API key:

```plaintext
NEXT_PUBLIC_YOUTUBE_DATA_API_KEY=your_youtube_data_api_key
```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

```bash
npm run build
```

### Starting the Production Server

```bash
npm start
```

### Linting

```bash
npm run lint
```

## Usage

### Adding a Video

1. Click on the "Change Video" button.
2. Enter the YouTube video link.
3. Click "Add".

### Adding a Note

1. Click on the "Add New Note" button.
2. Enter the timestamp and note message.
3. Click "Add Note".

### Editing a Note

1. Click on the "Edit Note" button next to the note.
2. Modify the timestamp and message.
3. Click "Edit Note".

### Deleting a Note

1. Click on the "Delete Note" button next to the note.

## Tech Stack and Libraries

- **Framework**: Next.js
- **Library**: React
- **Styling**: Tailwind CSS, DaisyUI
- **HTTP Client**: Axios
- **Icons**: React Icons
- **Notifications**: React Hot Toast

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
