<a id="anchor"></a>

# Online English Words Library 
The web application is an online dictionary:

the user enters a word or expression (in English) in the search field and receives detailed information:
* part of speech, 
* transcription, 
* audio, 
* examples with searched word, 
* synonyms, etc.

There is also a search history, a feedback form and bookmarks (you can add or remove the words you need). + the application supports _Russian, English, German, Korean, Japanese and Chinese._

***

The project is written due to __Vite__ + __ReactJS__ + __Redux Toolkit__ + __TypeScript__ + __TailwindCSS__

***

### Page structure:

1. Main
  1.1 NavBar
  1.2 Main Content
  1.3 Contact
  1.4 Footer
2. Bookmarks
3. Not Found

***

### Instruction:
* Main Page

![картинка](./public/readmeImage/markdownImage.png)

1. The field for writing a needed word
2. Search button (after clicking user gets response from api)
3. Clear the field
4. Copy entered word
5. Add entered word to Bookmarks
6. Remove entered word to Bookmarks
7. List of favourite words (_point 5_)
8. List of bookmarked words (_point 6_)
9. Your search history
10. Clear all History
(also user has an opportunity to send email to developer :))

* Bookmarks Page

<!-- * фывфыв
* фывфыв
  * фывфыв -->


---
__Жирный__

___

_Курсив_

***

___Жирный Курсив___

Code
```
useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", 'dark')
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", 'light');
    }
  }, [theme]);
```

> Цитата 
фывфывфыв
фывйуйвцыфффв lorem15
>> Вложенная цитата

Сноска первая[^1] и вторая[^2]

***

[^1]: текст сноски 1
[^2]: текст сноски 2 - сноска всегда уходит в конец

Ссылка:
[ссылка на что-то](https://github.com/Esmurzelly/short_work)

***

![картинка](./client/public/vite.svg)

Изображение-ссылка:
[![картинка](./client/public/vite.svg)](https://github.com/Esmurzelly/short_work)

*** 

Таблица:

цвет | количество | размер
:----|:-----------|-------:
красный | 1 | 256
синий   | 2 | 22
зеленый | 5 | 6543

\# text

Термин 
: Определение

[Up](#anchor)