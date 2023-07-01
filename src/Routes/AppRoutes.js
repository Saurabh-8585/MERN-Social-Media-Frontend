import React, { lazy, Suspense } from 'react'
import { Toaster } from 'react-hot-toast'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import HomePage from '../Pages/HomePage'
import Explore from '../Pages/Explore'
import Login from '../Auth/Login'
import Register from '../Auth/Register'
import LoadingSpinner from '../Components/Loader/LoadingSpinner'
import Sidebar from '../Navigation/SideBar'
const LazyNotification = lazy(() => import('../Pages/Notification'));
const LazyMessage = lazy(() => import('../Pages/Message'));
const LazyBookmark = lazy(() => import('../Pages/Bookmark'));
const LazyProfile = lazy(() => import('../Pages/Profile'));
const ErrorPage = lazy(() => import('../Pages/ErrorPage'))
const SinglePost = lazy(() => import('../Pages/SinglePost'))
const Settings = lazy(() => import('../Pages/Settings'))

const AppRoutes = () => {
    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <Router>
                <div className="flex">
                    <Sidebar />
                    <div className="flex-1 lg:ml-28 mt-20">
                        <Routes>
                            <Route index path="/" element={<HomePage />} />
                            <Route path="/SignIn" element={<Login />} />
                            <Route path="/SignUp" element={<Register />} />
                            <Route path="/explore" element={<Explore />} />

                            {/* lazy loaded components */}

                            <Route path="/post/:id" element={
                                <Suspense fallback={<LoadingSpinner />}>
                                    <SinglePost />
                                </Suspense>
                            } />

                            <Route
                                path="/notifications"
                                element={
                                    <ProtectedRoute>
                                        <Suspense fallback={<LoadingSpinner />}>
                                            <LazyNotification />
                                        </Suspense>
                                    </ProtectedRoute>
                                }
                            />

                            <Route
                                path="/messages"
                                element={
                                    <ProtectedRoute>
                                        <Suspense fallback={<LoadingSpinner />}>
                                            <LazyMessage />
                                        </Suspense>
                                    </ProtectedRoute>
                                }
                            />

                            <Route
                                path="/bookmarks"
                                element={
                                    <ProtectedRoute>
                                        <Suspense fallback={<LoadingSpinner />}>
                                            <LazyBookmark />
                                        </Suspense>
                                    </ProtectedRoute>
                                }
                            />

                            <Route
                                path="/profile/:id"
                                element={
                                    // <ProtectedRoute>
                                    <Suspense fallback={<LoadingSpinner />}>
                                        <LazyProfile />
                                    </Suspense>
                                    // </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/settings"
                                element={
                                    <ProtectedRoute>
                                        <Suspense fallback={<LoadingSpinner />}>
                                            <Settings />
                                        </Suspense>
                                    </ProtectedRoute>
                                }
                            />


                            <Route path="*" element={
                                <Suspense fallback={<LoadingSpinner />}>
                                    <ErrorPage />
                                </Suspense>
                            } />
                        </Routes>
                    </div>
                </div>
            </Router>
        </>
    )
}

export default AppRoutes