import React from "react";

const NotFound = () => {
  return (
    <section className="flex items-center h-screen p-16 dark:bg-gray-900 dark:text-gray-100 w-full">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto">
        <div className="max-w-md text-center h-full">
          <h2 className="mb-8 font-extrabold text-9xl dark:text-IGLorange h-full">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">
            Sorry, we couldn't find this page.
          </p>
          <p className="mt-4 mb-8 dark:text-gray-400">
            But dont worry, you can find plenty of other things on our homepage.
          </p>
          <a
            rel="noopener noreferrer"
            href="\"
            className="px-8 py-3 font-semibold rounded dark:bg-IGLorange dark:text-IGLblanc"
          >
            Back to homepage
          </a>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
