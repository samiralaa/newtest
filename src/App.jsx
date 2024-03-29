import styles from "./styles/_App.module.scss";
import { useState, useEffect, lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useTranslation } from "react-i18next";
import RootLayout from "./pages/RootLayout";
import Cookies from "js-cookie";
const HomePage = lazy(() => import("./pages/HomePage"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Projects = lazy(() => import("./pages/Projects"));
const Category = lazy(() => import("./pages/Category"));
const AllProjects = lazy(() => import("./pages/AllProjects"));
const Careers = lazy(() => import("./pages/Careers"));
const JobApply = lazy(() => import("./pages/JobApply"));
const CategoryOfProducts = lazy(() => import("./pages/CategoryOfProducts"));
const CareerDetails = lazy(() => import("./pages/CareerDetails"));
const CategoryItems = lazy(() => import("./pages/CategoryItems"));
const CategoryItem = lazy(() => import("./pages/CategoryItem"));
const Loading = lazy(() => import("./components/UI/Loading"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <RootLayout />
      </Suspense>
    ),
    errorElement: <p>error</p>,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <HomePage />
          </Suspense>
        ),
        loader: () =>
          import("./pages/HomePage").then((module) => module.loader()),
        errorElement: <p>error</p>,
      },
      {
        path: "AboutUs",
        element: (
          <Suspense fallback={<Loading />}>
            <AboutUs />
          </Suspense>
        ),
        loader: () =>
          import("./pages/AboutUs").then((module) => module.loader()),
        errorElement: <p>error</p>,
      },

      {
        path: "all/project",
        element: (
          <Suspense fallback={<Loading />}>
            <AllProjects />
          </Suspense>
        ),
        loader: () =>
          import("./pages/AboutUs").then((module) => module.loader()),
        errorElement: <p>error</p>,
      },
      {
        path: "Projects",
        element: (
          <Suspense fallback={<Loading />}>
            <Projects />
          </Suspense>
        ),
        loader: () =>
          import("./pages/Projects").then((module) => module.loader()),
        errorElement: <p>error</p>,
      },
      {
        path: "Projects/:category",
        element: (
          <Suspense fallback={<Loading />}>
            <Category />
          </Suspense>
        ),
        errorElement: <p>error</p>,
        loader: ({ params }) =>
          import("./pages/Category").then((module) =>
            module.loader({ params })
          ),
      },
      {
        path: "Projects/:category/:categoryName",
        element: (
          <Suspense fallback={<Loading />}>
            <CategoryItems />
          </Suspense>
        ),
        errorElement: <p>error</p>,
        loader: ({ params }) =>
          import("./pages/CategoryItems").then((module) =>
            module.loader({ params })
          ),
      },
      {
        path: "Projects/:category/:categoryName/:itemId",
        element: (
          <Suspense fallback={<Loading />}>
            <CategoryItem />
          </Suspense>
        ),
        errorElement: <p>error</p>,
        loader: ({ params }) =>
          import("./pages/CategoryItem").then((module) =>
            module.loader({ params })
          ),
      },
      {
        path: "Careers",
        element: (
          <Suspense fallback={<Loading />}>
            <Careers />
          </Suspense>
        ),
        loader: () =>
          import("./pages/Careers").then((module) => module.loader()),
        errorElement: <p>error</p>,
      },
      {
        path: "Careers/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <CareerDetails />
          </Suspense>
        ),
        errorElement: <p>error</p>,
        loader: ({ params }) =>
          import("./pages/CareerDetails").then((module) =>
            module.loader({ params })
          ),
      },
      
      {
        path: "ContactUs",
        element: (
          <Suspense fallback={<Loading />}>
            <ContactUs />
          </Suspense>
        ),
        errorElement: <p>error</p>,
      },
      {
        path: "product/fre",
        element: (
          <Suspense fallback={<Loading />}>
            <CategoryOfProducts />
          </Suspense>
        ),
        loader: () =>
          import("./pages/Projects").then((module) => module.loader()),
        errorElement: <p>error</p>,
      },
      {
        path: "apply/:careerId",
        element: (
          <Suspense fallback={<Loading />}>
            <JobApply />
          </Suspense>
        ),
        errorElement: <p>error</p>,
      },
      
    ],
  },
]);
function App() {
  const { i18n } = useTranslation("global");
  const [classState, setClass] = useState("ltr");
  useEffect(() => {
    if (i18n.language === "en") {
      setClass("ltr");
    } else {
      setClass("rtl");
    }
  }, [i18n.language]);
  useEffect(() => {
    const storedLang = Cookies.get("lang");
    if (storedLang) {
      i18n.changeLanguage(storedLang);
    }
  }, []);

  return (
    <div className={classState === "rtl" ? styles.rtl : styles.ltr}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
