import { Outlet, Route, Routes } from 'react-router-dom'

import { AppErrorBoundary } from '@/components/layout/AppErrorBoundary'
import { RootLayout } from '@/components/layout/RootLayout'
import { Home } from '@/routes/Home'
import { About } from '@/routes/About'
import { WhoWeAre } from '@/routes/WhoWeAre'
import { Leadership } from '@/routes/Leadership'
import { FirstTimers } from '@/routes/FirstTimers'
import { Students } from '@/routes/Students'
import { PrayerRequest } from '@/routes/PrayerRequest'
import { ServiceTimes } from '@/routes/ServiceTimes'
import { Ministries } from '@/routes/Ministries'
import { Posts } from '@/routes/Posts'
import { Sermons } from '@/routes/Sermons'
import { PostDetail } from '@/routes/PostDetail'
import { Events } from '@/routes/Events'
import { EventDetail } from '@/routes/EventDetail'
import { Donations } from '@/routes/Donations'
import { Gallery } from '@/routes/Gallery'
import { Membership } from '@/routes/Membership'
import { Contact } from '@/routes/Contact'
import { NotFound } from '@/routes/NotFound'
import { StudioPage } from '@/routes/Studio'

const SiteLayout = () => (
	<RootLayout>
		<Outlet />
	</RootLayout>
)

const App = () => {
	return (
		<AppErrorBoundary>
			<Routes>
				{/* Studio — full-screen, no site header/footer */}
				<Route path='/studio/*' element={<StudioPage />} />

				{/* Site routes — wrapped in header/footer layout */}
				<Route element={<SiteLayout />}>
					<Route path='/' element={<Home />} />
					<Route path='/about' element={<About />} />
					<Route path='/who-we-are' element={<WhoWeAre />} />
					<Route path='/leadership' element={<Leadership />} />
					<Route path='/first-timers' element={<FirstTimers />} />
					<Route path='/students' element={<Students />} />
					<Route path='/prayer-request' element={<PrayerRequest />} />
					<Route path='/service-times' element={<ServiceTimes />} />
					<Route path='/ministries' element={<Ministries />} />
					<Route path='/posts' element={<Posts />} />
					<Route path='/posts/:slug' element={<PostDetail />} />
					<Route path='/sermons' element={<Sermons />} />
					<Route path='/events' element={<Events />} />
					<Route path='/events/:slug' element={<EventDetail />} />
					<Route path='/donations' element={<Donations />} />
					<Route path='/gallery' element={<Gallery />} />
					<Route path='/membership' element={<Membership />} />
					<Route path='/contact' element={<Contact />} />
					<Route path='*' element={<NotFound />} />
				</Route>
			</Routes>
		</AppErrorBoundary>
	)
}

export default App
