import icon from "../assets/icon2.png";

function Footer() {
  return (
    <footer className="bg-black text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 pt-5">
        <div className="text-center">
          <img src={icon} alt="" className="mx-auto mb-2" />

          <p className="text-sm text-gray-300">
            Experience the thrill of live cricket auctions, build your dream
            team, and compete with others in real-time!
          </p>
          <div className="pt-2">
            <p className="text-sm text-gray-300">
              Email : contact@cricketauction.com
            </p>
            <p className="text-sm text-gray-300 mb-3">
              Phone : +91 98765 43210
            </p>
          </div>
        </div>
      </div>

      <div className="bg-black text-center text-sm text-gray-400 pb-4">
        © {new Date().getFullYear()} Cricktrade. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
