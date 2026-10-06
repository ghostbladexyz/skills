# Teaching models

These original examples show how to connect a reader's question, code, observations, explanation, practice, and feedback. They use Rust to make the relationships concrete; generated books must use the actual project's language and evidence. The examples are book-only teaching variations, not changes to a repository or claims about its history. Their local file-setup wording is for standalone models, not a template to repeat in a generated book; establish one named practice workspace for a multi-lesson guide and refer to it consistently.

Before drafting a main lesson, read the opening model, first-introduction model, passage-revision model, and concept model. Also read the staged project model for development walkthroughs, the file-state repair when shown source and the reader's working copy can differ, and the connected lessons for repair, design comparisons, or a progression toward independent work. Use the examples to judge explanatory depth and pacing. Do not paste their prose, copy their headings as a template, or add these features to a project that does not need them. Writer calibration notes explain the model's choices; they do not belong in a generated lesson.

## Opening model: start from a visible success

This short opening assumes only variables, functions, and basic terminal use. It does not assume that the reader knows Rust's `main` function, print syntax, or how Rust source becomes a running program. The three complete versions form a tiny packing calculator; use the same teaching relationships with the actual project's behavior in a generated book.

### Make the program run

From the single `practice` folder established in the guide's setup instructions, create `main.rs`:

```rust
fn main() {
    println!("Packing calculator ready.");
}
```

In Rust, `fn main()` declares the function that starts the program. Its braces contain the instructions to run. `println!` writes the text and ends the line; the `!` is part of the print-macro syntax. The semicolon ends this statement. We do not need to explain how macros expand to understand this result.

The `rustc` command turns the source file into a program. Compile with `rustc --edition=2024 main.rs`, then run `./main` on Linux or macOS or `.\main.exe` in Windows PowerShell. For each replacement below, run these same commands again. The program prints:

```text
Packing calculator ready.
```

This first complete example establishes where execution begins, where an action belongs, how output appears, and how to run the file. None of those is silently counted as prior knowledge.

### Give one value a job

Now the calculator should show how many boxes are being packed. Replace the file with this complete version:

```rust
fn main() {
    let boxes = 3;
    println!("Boxes to pack: {boxes}");
}
```

`let boxes = 3;` gives the whole number `3` the name `boxes`. In the print text, `{boxes}` displays that value where the braces appear. The output changes to `Boxes to pack: 3` because the program now uses the value instead of printing only a fixed message.

### Calculate a useful total

A box count is not yet the total number of items. Add a second quantity and multiply them:

```rust
fn main() {
    let boxes = 3;
    let items_per_box = 4;
    let total_items = boxes * items_per_box;
    println!("Items to pack: {total_items}");
}
```

The first two names hold `3` and `4`. The `*` operation multiplies those values, and `total_items` names the result, `12`. The final line displays that result. This stage reuses the entry point, bindings, and print behavior already shown; its new relationship is how the two stored quantities produce a total.

For a quick check, change the values to `5` and `2`. Predict the output before running; it should say `Items to pack: 10`. The calculation is now established, so a next lesson can ask how the program should receive those quantities from a person. It should introduce input only when that question matters, and trace the entered text before adding parsing or error handling.

Writer calibration: the opening does not treat syntax from its first listing as self-explanatory. Each runnable stage relies on the established scaffold and adds a concrete behavior with an observable result. A real Cargo project should use its actual package command and show the minimal project context needed to run it; do not prescribe `rustc` for a project that must be built through Cargo. This is a progression model, not a required packing example or fixed Rust curriculum.

## First-introduction model: reading one line of text

This model follows an opening lesson that established `fn main`, `let`, `println!`, and how to compile and run a file. The reader otherwise knows only variables, functions, and basic terminal use from another language. They have not learned `String`, `mut`, references, method chains, or `Result`. In a real book, establish the opening lesson rather than silently adding Rust syntax to the declared prerequisites.

### Make a place for the text

We can already print a fixed message. Now we want to keep a label that someone types and print that label back. Input from the keyboard arrives as text, so our first problem is where to store it.

In a separate practice folder, create `label_demo.rs` with this complete runnable example. It uses only Rust's standard library:

```rust
fn main() {
    let label = String::new();
    println!("Stored label: [{label}]");
}
```

`String` is a Rust type that stores text whose contents can grow or change. `String::new()` creates an empty value of that type. In this expression, `::` identifies `new` as a function provided by `String`, and `()` calls it. The `let` statement gives the resulting value the name `label`.

From that folder, compile with `rustc --edition=2024 label_demo.rs`. Run `./label_demo` on Linux or macOS, or `.\label_demo.exe` in Windows PowerShell. The expected output is:

```text
Stored label: []
```

There is nothing between the brackets because the string is empty. We have made a place for the text, but we have not read any text into it.

### Let the input operation fill it

Reading a label will change the empty string. Rust normally prevents us from changing the contents of this variable, so this version adds `mut` before `label`. Replace the file with the following complete version, then compile and run it with the same commands:

```rust
fn main() {
    let mut label = String::new();
    println!("Type a label:");

    std::io::stdin()
        .read_line(&mut label)
        .expect("Could not read the label");

    println!("Stored label: [{label}]");
}
```

The new operation starts with `std::io::stdin()`. This calls the `stdin` function in the standard library's input/output module. It gives us access to standard input, which normally receives what we type in the terminal.

We call `read_line` on that input value. The dot means the operation belongs to the value before it; a function called this way is called a method. Here, the method reads one line and appends it to a string. It needs to know which string to fill.

The argument `&mut label` gives the method temporary access to change our string. That access is called a mutable reference. The `mut` in `let mut label` allows the string's contents to change; the `&mut` at the call gives this particular method access to make that change. After reading, the string is still available as `label`, so the final print can use its contents. References have further rules about when different parts of a program may access the same value. Those rules are outside this short lesson; the Rust Book's [references and borrowing section](https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html) explains them in depth.

Reading also needs a way to report failure. `read_line` therefore does two separate jobs: it adds the input to `label`, and it returns a value describing whether the read succeeded. That returned value is a `Result`. A successful read returns `Ok` with the number of bytes read. A failed read returns `Err` with information about the error.

The next method, `expect`, operates on that returned result, not on the string. If the result is `Ok`, `expect` gives back its byte count; this example does not save that count. If the result is `Err`, it stops the program with the message we supplied. This is a simple failure policy for the demonstration. Checking for an ended input stream or recovering from read errors would require additional handling.

The three displayed lines beginning with `std::io::stdin()` form one statement. Read them as: get standard input, read a line into `label`, then check whether reading succeeded. The line breaks help us see the steps; the semicolon ends the statement. Notice that the printed label comes from the changed string, not from `expect`'s returned count.

### See what was stored

At the prompt, type `Parcel A` and press Enter. In the expected session below, `Parcel A` is the line you type; the other lines are program output:

```text
Type a label:
Parcel A
Stored label: [Parcel A
]
```

Why did the closing bracket appear on another line? `read_line` keeps the line ending when the input supplies one. The string therefore contains both the label and the line ending from pressing Enter. Printing the string moves the closing bracket to the next line. We have read a line of text, not only the visible letters.

Before running the program again, predict what happens if you enter `57` instead. Does the program now hold an integer?

It still holds text. `read_line` appends the characters `5` and `7`, followed by the line ending; it does not convert them into a number. The program prints them just as it printed `Parcel A`. A later operation would have to perform a conversion before numeric calculations could use that input.

You can now follow the two effects of reading: the string receives the text, while the returned result reports success or failure. We have also seen that the stored text includes a line ending. To use only the visible label, our next step would be to leave out surrounding whitespace. That is a separate operation from reading or converting text into a number.

Writer calibration: the opening starts from printing, which the reader already knows. An empty output establishes what `String::new()` did before input adds more machinery. Each paragraph supplies the object needed by the next: string, change, input method, reference, returned result, and `expect`. The complete type signature is unnecessary here; its success and failure relationship is explained without introducing generic type notation or platform-sized integer types. The expected session shows the line-ending effect before any trace shorthand is introduced; the explanation names the effect in ordinary words. The prediction checks a distinction already taught. A book about a different language should reproduce these teaching relationships, not this code or its sequence of Rust features.

## Passage-revision model: repairing a compressed explanation

This is an editorial comparison, not another lesson to insert into a book. It shows how technically accurate facts can still require a beginner to supply the connections. Assume the reader has seen an empty `String` stored in a variable, but has not learned references or `Result`.

### The passage that needs revision

> The binding is mutable because reading changes the buffer. `&mut label` lends it to `read_line` while retaining ownership. The call returns `Result<usize, io::Error>`, and `expect` returns the successful byte count. An ended stream produces `Ok(0)`, which this example discards.

The first unsupported inference is in the opening sentence: the reader knows a string named `label`, but is asked to translate both "binding" and "buffer" before seeing which operation changes it. The next sentence assumes that "lends" establishes what a reference does. The remaining sentences abruptly change focus from stored text to a compound return type, then to an ended stream. The facts belong to related code, but the passage has not connected them.

### Repair the relationships

> We have an empty string named `label`. Reading input will add text to that string, so we add `mut` to allow its contents to change.
>
> `read_line` needs access to the same string. We pass `&mut label`, which gives the method temporary access to change it. This is a mutable reference. Once reading finishes, the program can use the stored text through `label`.
>
> Reading can also fail, so the method reports whether it succeeded. It returns a `Result`: `Ok` contains the number of bytes read, and `Err` contains information about a read error. The next method, `expect`, checks that result. It returns the byte count on success or stops with our message on failure. This example does not save the count; the later print uses the text already stored in `label`.

The revision keeps the causal chain visible: existing string, change, access to that string, and a separate report of success or failure. Repeating "string" and `label` preserves the objects the reader is following. It introduces the necessary technical names beside their concrete roles and explains which result the next method receives.

The exact compound type can wait until its parts matter. The ended-stream behavior belongs with the later question of how to stop when no more input arrives. It must be explained before an exercise depends on it, and must not disappear if it is a material limitation of the current example. Moving a detail changes its placement, not the obligation to teach it.

### Check the transition to the next paragraph

Suppose the next operation is trimming the input. An opening such as "`trim` returns a borrowed string slice" assumes another unfamiliar type before the reader sees the need. First show what the reader can see, then connect the operation to the text:

> Type a space followed by `57`, then press Enter. In this expected session, ` 57` is the line you type; the following lines are program output:
>
> ```text
> Type a label:
>  57
> Stored label: [ 57
> ]
> ```
>
> The space before the digits is part of the label. Enter also adds a line ending to the stored text, so the closing bracket appears on the next displayed line. `label.trim()` removes whitespace from the ends and gives us `"57"`. That result is still text; trimming does not change the original string or convert the digits into a number.

The terminal session is the visible observation. A later value trace may describe the stored text as the entered characters followed by the line ending from Enter. Use an escape such as `\n` only if a later operation needs that shorthand; explain it first and name a platform variant only when it changes the claim. If a later operation relies on the returned view being borrowed, explain that relationship before using it in ownership reasoning.

### Repair a familiar construct doing a new job

Assume an earlier lesson used `match` to print a message inside each arm. A later stage must use the parsed number after the `match` so it can compare the guess with a secret. This compressed explanation names inference before showing why a value must leave the arm:

> The `: u32` annotation gives the match its expected type. `Ok(num) => num` returns the parsed number.

The missing bridge is that the earlier arms finished their work by printing, while this stage needs a number for the next statement. Trace that changed job first:

> For typed text `42`, parsing produces `Ok(42)`. The pattern `Ok(num)` gives the contained `42` the local name `num`. The expression after `=>` supplies this arm's value, so the selected arm supplies `42`. The whole `match` expression produces that value; the outer `let guess` stores it for the comparison that follows. Now the `: u32` annotation has a concrete job: it tells Rust the type that the match must produce, which lets `parse()` know what number type to try to create.

The same syntax is familiar, but its result now feeds later code instead of ending in a print inside the arm. Explain that changed role before relying on the type annotation, shadowing, or another mechanism term.

### Repair a silent file-state change

Suppose one stage leaves the practice copy with the fixed secret `let secret_number: u32 = 42;`, while the next page shows the checked-in source, which chooses a random secret. The instruction "Run `cargo run --locked`" is not enough: displaying the source excerpt does not change the file on disk, so the command would still run the fixed-secret version.

Make the starting state and transition explicit:

> Your practice copy still has the fixed secret from the previous stage. The source view below is the checked-in program; it has not replaced your file. From `guessing_game_practice`, restore the current source with the reset command from setup (`Copy-Item ..\guessing_game\src\main.rs .\src\main.rs -Force`), then run `cargo run --locked`. The random version now chooses one secret for that run, and the input and comparison code stays the same.
>
> For a deterministic exercise, edit only the secret assignment in the practice copy to `let secret_number: u32 = 42;`, keep the loop and input code unchanged, and run the stated inputs. After the exercise, use the same reset command before returning to the checked-in random version.

This describes two distinct file states and the exact change between them. In another project, name its own file, reset operation, and retained code; do not assume that displaying a final listing updates the reader's workspace.

Writer calibration: locate the first missing premise, repair the passage, then read across its boundaries. Replacing specialist words alone would not connect a changed string to a returned status or a displayed source to the reader's actual file. Adding "therefore" would not establish either relationship. Use the same review on other subjects: what was established, which object, value, or file carries forward, what new fact or action is added, and why its consequence follows. A good passage needs no forced question, failure, extra heading, or revision quota.

## Concept model: why rejected input skips the rest of an iteration

A rejected input should not reach code that needs a number. Later inputs should still be processed. We need to skip the work for one input while keeping the loop available for the next. Follow the example below to see which statements run for each input.

This lesson assumes you have used `for` loops, `match`, and `parse::<u32>()`. Recall that parsing converts text to a number. It returns `Ok(number)` if the conversion succeeds and `Err(...)` if it fails. Here, the number must fit in `u32`, an unsigned integer type. The new idea is what `continue` does to the current iteration: one pass through the loop body.

This is a runnable teaching example with fixed inputs instead of keyboard input. In a separate practice folder, create `retry_demo.rs` with these complete contents. No external dependencies are needed.

```rust
fn main() {
    for input in ["18", "oops", "27"] {
        println!("Reading: {input}");

        let number = match input.parse::<u32>() {
            Ok(number) => number,
            Err(_) => continue,
        };

        println!("Accepted: {number}");
    }

    println!("Finished");
}
```

Before running it, predict whether an acceptance message appears for `oops`. Will the program still reach `27`?

From the folder containing the file, run `rustc --edition=2024 retry_demo.rs`. Then run `./retry_demo` on Linux or macOS, or `.\retry_demo.exe` in Windows PowerShell. These are commands to type; the block below contains the expected program output.

```text
Reading: 18
Accepted: 18
Reading: oops
Reading: 27
Accepted: 27
Finished
```

There is no acceptance message for `oops`, but the program does reach `27`. Follow each input to see how both things happen:

| Input | Parsing result | Selected branch | Next action |
| --- | --- | --- | --- |
| `"18"` | `Ok(18)` | `Ok(number)` | Store `18` in the variable declared by `let number`, then print the acceptance message. |
| `"oops"` | `Err(...)` | `Err(_)` | Run `continue`. Skip the rest of this iteration and take the next input. |
| `"27"` | `Ok(27)` | `Ok(number)` | Store `27`, then print the acceptance message. |

In `Ok(number) => number`, the name inside `Ok(...)` gives us access to the parsed number within that branch. The expression after `=>` supplies that number as the result of the `match`. The outer `let number` then gives the result a name for the acceptance message. The branch and the following statement use the same spelling for their names, but the value reaches the following statement through the result of the `match`.

For `"oops"`, parsing fails. Rust selects `Err(_)`, which runs `continue`. This starts the next iteration before the assignment to `number` is completed. The acceptance message is skipped too. The `_` means this example does not use the error details.

`continue` does not leave the whole loop. It skips the remaining statements in the current iteration of the innermost loop. This `for` loop then takes the next value from the array. After the last value, the loop ends and the program prints `Finished`. In a keyboard-input loop, another prompt depends on code at the start of the next iteration; `continue` does not itself read input.

Now replace only the array with `["bad", "8", "wrong", "5"]`. Predict the acceptance messages before recompiling and running. Hint: choose the matching branch for each input separately.

The acceptance messages are `Accepted: 8` and `Accepted: 5`, in that order. All four inputs get a reading message because that statement runs before parsing. Each invalid input skips only its own acceptance message. `Finished` appears once after the loop.

For another check, use `["bad", "wrong"]` and predict the complete output without the hint. After recompiling, expect two reading messages, no acceptance messages, and one `Finished`. Invalid inputs do not stop the loop from reaching its end.

You can now explain which statements a rejected input skips and why later valid inputs still run. This example silently skips invalid input. An application that needs to tell the user what went wrong would also need an error message.

Writer calibration: the prose starts with familiar actions and explains technical names where needed. The prediction comes before its answer. The trace and the prose explain different parts of the same result. Reuse this rule in an actual later lesson only when the project needs it.

## Project model: show the work still waiting

A small task list should show what remains to be done. We will start by printing task titles, add a completion flag, and then use that flag to decide what to print. Once the condition is in place, we can use a task's stored flag to predict whether its title appears.

This lesson assumes you already know Rust functions, arrays, structs, `String::from`, `for`, `if`, Boolean values, and `!` for reversing a Boolean. The goal is to combine those ideas into one behavior. In a separate practice folder, create `tasks_demo.rs`. Each listing below is a complete runnable version that replaces the file's contents. Compile each version there with `rustc --edition=2024 tasks_demo.rs`, then run `./tasks_demo` on Linux or macOS, or `.\tasks_demo.exe` in Windows PowerShell. No external dependencies are needed.

### First, make the list visible

```rust
fn main() {
    let tasks = ["Pack charger", "Fill bottle", "Check tickets"];

    for title in tasks {
        println!("{title}");
    }
}
```

The expected output contains those three titles in that order. Each pass through the loop takes one title from the array and prints it. That gives us a working starting point, but there is no stored information about which tasks are finished.

### Keep the title and completion flag together

Replace the whole file with this runnable version:

```rust
struct Task {
    title: String,
    done: bool,
}

fn main() {
    let tasks = [
        Task { title: String::from("Pack charger"), done: false },
        Task { title: String::from("Fill bottle"), done: true },
        Task { title: String::from("Check tickets"), done: false },
    ];

    for task in tasks {
        println!("{}: done={}", task.title, task.done);
    }
}
```

Previously, each array item was only a title. It is now a `Task` with two named fields. `title` stores the text, and `done` stores whether the task is finished. Keeping them in one value means each completion flag belongs to a particular title. `String::from` creates the owned text value required by the `title: String` field.

The loop still visits all three items. Its variable is now named `task` because it holds the whole task, not only its title. We can read both fields from that value. The expected output is:

```text
Pack charger: done=false
Fill bottle: done=true
Check tickets: done=false
```

The stored flag alone does not hide anything. The second title still appears because the print statement runs for every item. We need a condition around that statement.

### Print a title only when its task is unfinished

Inside `main`, replace the `for task in tasks` loop so it prints a title only when its task is unfinished. Keep the struct and task array unchanged:

*tasks_demo.rs · Focused excerpt*

```rust
for task in tasks {
    if !task.done {
        println!("{}", task.title);
    }
}
```

Before compiling again, predict which title will disappear. The expected output is:

```text
Pack charger
Check tickets
```

For the charger task, `done` is `false`, so `!task.done` is `true` and the title is printed. For the bottle task, `done` is `true`, so the condition is `false` and the print statement is skipped. The loop still visits the ticket task afterward. We changed which titles are printed, not the array's contents.

For practice, add `Task { title: String::from("Close windows"), done: false }` at the end of the array. Before running, predict its position in the output. Then change only its flag to `true` and run again. The first run should print it last; the second should omit it while leaving the other output unchanged. Each change requires recompilation.

For an independent check, choose the flags yourself so that only `Fill bottle` appears. Then compare your choice with this one: set its flag to `false` and both other original flags to `true`; keep `Close windows` finished if you retained it. The condition then accepts only the bottle task. Other arrangements that produce exactly that result are valid if you explain your changes.

You can now use stored information to decide what a list displays. This example keeps tasks only while the program runs; it does not save changes or accept user input. Those features would need separate work if the project required them.

Writer calibration: each stage changes one useful relationship. The complete listings establish runnable milestones; the final excerpt has an exact replacement location. In generated HTML, include the full final file behind that excerpt: keep the `main` boundary and revised loop visible, hide the unchanged struct and task array behind `// --snip--` markers, and let the eye button reveal those real lines in a softer color. Use the working asset linked from `SKILL.md` for that presentation. Copying should yield the full final file with the revised loop, not the earlier version or this Markdown fragment. The explanations connect stages without repeating every definition. One practice task checks the shared lesson outcome; the subsections do not each need their own contract, exercise, and recap.

## Connected lessons: fix a count, then choose what to keep

These two lessons continue the task example. The first teaches a repair through a concrete wrong result. The second uses the repaired behavior to compare valid designs. They assume the earlier task lesson plus functions, `usize`, slices, borrowed parameters, returned values, `assert_eq!`, and vectors. Explain those prerequisites elsewhere before using this pair in a real book.

### Lesson one: why the unfinished count is wrong

We can show unfinished tasks. Now suppose the program also reports how many remain. A helper should return that count so the caller can decide how to display it. Can a program compile and still count the wrong tasks?

This is a runnable teaching variation that intentionally produces the wrong count and then fails an assertion. In the same practice folder, create `count_demo.rs` with these complete contents:

```rust
struct Task {
    title: String,
    done: bool,
}

fn pending_count(tasks: &[Task]) -> usize {
    let mut count = 0;
    for task in tasks {
        if task.done {
            count += 1;
        }
    }
    count
}

fn main() {
    let tasks = [
        Task { title: String::from("Pack charger"), done: false },
        Task { title: String::from("Fill bottle"), done: true },
        Task { title: String::from("Check tickets"), done: false },
    ];
    for task in &tasks {
        println!("{}: done={}", task.title, task.done);
    }
    let count = pending_count(&tasks);
    println!("Still waiting: {count}");
    assert_eq!(count, 2);
}
```

Compile with `rustc --edition=2024 count_demo.rs`. Run `./count_demo` on Linux or macOS, or `.\count_demo.exe` in Windows PowerShell. Before running, predict the count using the condition inside `pending_count`, not the function's name.

The program prints the three task records and `Still waiting: 1`, then the assertion fails because it expected `2`. Compiler warnings or the exact assertion diagnostic may vary; the important observations are the count of `1` and the failed check. This is a logic error after successful compilation.

The helper starts at zero. Its condition is true only for the bottle task, whose `done` flag is `true`. It therefore counts finished tasks even though its name promises unfinished tasks. The assertion states the actual requirement: the charger and ticket tasks are still waiting, so the count should be two.

Locate and correct the condition before reading the answer. Then recompile and run to check the count and assertion.

Replace `if task.done` with `if !task.done` inside `pending_count`. The helper now adds one for each unfinished task and skips finished tasks. The expected count becomes `2`, and the assertion passes. A successful compile alone could not establish this rule because both conditions are valid Rust.

Now make two independent runs. First set all flags to `true` and change the assertion to expect `0`. Then set all flags to `false` and expect `3`. Recompile after each change. Keep the helper unchanged. These cases check that the helper handles both ends of the range, not only the original mixture.

You can now trace a count and check whether its condition matches the promised behavior. Keep this rule available for the next question: should showing unfinished work mean deleting finished work?

### Lesson two: displaying fewer tasks without losing the rest

The repaired helper counts unfinished tasks without changing the list. Its `&[Task]` parameter lets it read the caller's tasks while the caller keeps them. The condition chooses which tasks affect the count; it does not remove them.

Suppose the application must show unfinished tasks now and allow the user to view finished tasks later. Two possible designs are to keep only unfinished tasks in storage, or to keep every task with a completion flag and select which ones to display. Both can show an unfinished list. Only the second keeps the information needed for a later finished-task view unless the first also stores that information elsewhere.

Keeping every task costs storage for the finished records and requires checking the flag when building a view. Keeping only unfinished tasks leaves fewer records to process, but deleting a finished record loses its title. Separate lists could also preserve both sets, at the cost of moving records when their status changes. None of these choices is universally best. If the application is explicitly meant to forget finished work, storing only unfinished tasks may be enough.

For practice, choose a design for these two requirements before reading the feedback: a packing checklist should show finished items for review; a temporary queue should permanently discard a job after successful processing. Explain what information each design must preserve. No code change is needed for this comparison.

The checklist needs to retain finished records, so keeping the flag-based list is one valid choice. Separate finished and unfinished lists would also work if status changes are handled correctly. The temporary queue may remove a processed job because the stated requirement does not need it afterward. These choices follow the stated requirements; they are not claims about an original project's design.

For a final independent application, extend the repaired count example to report both unfinished and finished totals without changing the stored tasks. Decide where the new behavior belongs. For the original three records, the two totals must be `2` and `1`; for all-finished and all-unfinished records, they must be `0` and `3`, then `3` and `0`. Add assertions for your chosen inputs and recompile after each change.

Hint: the totals account for all records. One valid approach is to keep `pending_count`, then calculate the finished count as `tasks.len() - pending_count(&tasks)`. This works because each Boolean flag is either finished or unfinished, and the helper counts every unfinished task once. A separate counting loop is also valid. Neither approach requires deleting records.

You can now distinguish choosing what to display from choosing what to retain. Keep a record when a later requirement needs its information; omit it from a view when the current view does not need it.

Writer calibration: the first lesson supplies a focused failure but asks the reader to locate its cause. The second recalls that result and moves to a decision under changed requirements. The final task combines earlier ideas with less instruction about placement. Feedback remains available. These are content choices, not a requirement to add a quiz interface or new project features.
