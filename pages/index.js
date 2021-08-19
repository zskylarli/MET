import React from 'react';
import SearchForm from '../components/search';
import Slideshow from '../components/slideshow';

export default function Page() {

  return (
    <div>
      <div className="logoContainer">
        <img src='/metlogo.png' className='logo'/>
      </div>
      <Slideshow />

			<SearchForm />

      <style jsx>{`
      .logoContainer {
        z-index: 3;
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: transparent;
        text-align: center;
      }
			.logo {
        position:absolute;
        width:30vw;
        top:50%;
        left:50%;
        transform: translate(-50%, -50%);
      }

		`}</style>

			<style jsx global>{`
			@import url('https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600&display=swap');
			@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css");
			html,
			body {
				padding: 0;
				margin: 0;
				font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
					Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
					sans-serif;
				font-family: 'Bitter', serif;
			}

			* {
				box-sizing: border-box;
			}
		`}</style>
		</div>  
  )
}

// Page.getLayout = function getLayout(page) {
//   return (
//     <Layout>
//       <NestedLayout>{page}</NestedLayout>
//     </Layout>
//   )
// }

