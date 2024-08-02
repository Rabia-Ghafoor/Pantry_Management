// app/head.js

export const metadata = {
    title: 'Pantry Management',
    description: 'Manage your pantry items efficiently',
  };
  
  export default function Head() {
    return (
      <>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </>
    );
  }
  