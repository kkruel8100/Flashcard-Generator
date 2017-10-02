# Flashcard-Generator and Study

The app has two components using a Node module:<br/>

1. Allows the user to generate flashcards either a basic or a cloze-deleted type. <br/>

The backend will essentially constitute an API that allows users to create two types of flashcards.<br />

Basic flashcards, which have a front ("Who was the first president of the United States?"), and a back ("George Washington").<br />

Cloze-Deleted flashcards, which present partial text ("... was the first president of the United States."), and the full text when the user requests it ("George Washington was the first president of the United States.")<br />

2. Allows the user to study the flashcards stored in the system. <br/>

The app can be started with node flashCard.js.