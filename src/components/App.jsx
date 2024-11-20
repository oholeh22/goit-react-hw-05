import NotFound from '../pages/NotFoundPage/NotFoundPage'
import './App.css'

function App () {
return (
    <>
    <Suspense fallback={<div>Loading page...</div>}>
    <Routes>
    <Route path="" element={} />
    <Route path="" element={} />
    <Route path="" element={} />
    <Route path="" element={} />
    <Route path="*" element={<NotFound />} />
    </Routes>
    </Suspense>
    </>
)
}

export default App
