import type { MetaFunction } from "remix";

export let meta: MetaFunction = () => {
  return {
    title: "Shpëtim Selaci",
    description: "Welcome to my site!"
  };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {

  return (
    <>
      <h2>Hi there! 👋</h2>

      <p>
        If you like crafting slick products, making stuff scale, learning new technologies, you've come to the person who also does.<br/>
        As of now, I'm really into TypeScript, React ecosystem, microservices, serverless, and AWS.<br/>
        
      </p>
      <p>
        If you would want to work together on something, hit me at <a href="mailto:shselaci3@gmail.com?subject=Hey there Shpetim 👋!&body=I'm sold!%0D%0AWhat do you think about..." target="_blank">shselaci3@gmail.com</a>.
      </p>
      <p>Thank you!</p>
    </>

  );
}
