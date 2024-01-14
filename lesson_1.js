// Lesson 1 - The Dom

// The Document Object Model(DOM)

// 1
// False. The browser may insert nodes that don't appear in the HTML due to invalid markup or the omission of optional tags. Text, including whitespace, also creates nodes that don't map to tags.

// 2
// True. All text including whitespace in the original HTML appears in the DOM as a text node.

// 3

// <html>
//   <head>
//     <title>Newsletter Signup</title>
//   </head>
//   <body>
//     <!-- A short comment -->
//     <h1>Newsletter Signup</h1>
//     <p class="intro" id="simple">
//       To receive our weekly emails, enter your email address below.
//       <a href="info.html">Get more info</a>.
//     </p>
//     <div class="form">
//       <form>
//         <label>
//           Enter your email:
//           <input name="email" placeholder="user.name@domain.test"/>
//         </label>
//         <p class="controls">
//           <button id="cancelButton">Cancel</button>
//           <button type="submit" id="submitButton">Subscribe</button>
//         </p>
//       </form>
//     </div>
//   </body>
// </html>

