import HomeScreen from '../assets/images/home-monitor.png'
function HomePage() {
  return (
    <section className="home-page">
      <header className='head'>
        <p>Providing an organized, efficient work enviorment</p>
        <p>Keep your tasks at bay, schedule and manage your time with ease, all with Home Note</p>
      </header>
      <section className='monitor-view'>
        <img src={HomeScreen} className='home-view' />
        <div>
          <p>Responsive</p>
          <p>Easy to use</p>
          <p>Improving</p>
        </div>
      </section>
      <article className='reviews'>
        <h2>What people are saying</h2>
        <section>
          <div>
            <p>The app keeps improving and adding new usefull features, super well-made</p>
            <h3>Carol</h3>
          </div>

          <div>
            <p>Really user friendly and fun to use!</p>
            <h3>Sharon</h3>
          </div>

          <div>
            <p>Couldn't ask for better, it sky-rocketed my productivity</p>
            <h3>Charles</h3>
          </div>
        </section>
      </article>
    </section>
  )
}

export default HomePage