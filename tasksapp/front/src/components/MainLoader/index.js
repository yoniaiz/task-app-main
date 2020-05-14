import React, { useEffect } from "react";
import lottie from "lottie-web";
import loading_animation from "../../assets/animation/loaders/11576-page.json";

export default () => {
  let loading = null;

  useEffect(() => {
    lottie.loadAnimation({
      container: loading,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: loading_animation,
    });
  }, []);

  return (
    <div className="main-loader-page">
      <div className="loader" ref={(ref) => (loading = ref)} />
    </div>
  );
};
