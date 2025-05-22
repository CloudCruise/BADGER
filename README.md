<p align="center">
  <img
    src="https://github.com/user-attachments/assets/55011a85-64bc-42e1-af7b-7087622829b8"
    alt="BADGER_ICON"
    width="400"
  />
</p>

# BADGER (Browser Automation Directed Graph Engine Ruleset)

## Reliable Browser Automation ≠ One-Off Scripts

Playwright is fantastic – until your quick automation task devolves into hundreds of lines of loops, retries, and messy conditionals.

We hit this exact wall building robust form-filling bots. Instead of piling on more hacks, we asked: **What if automation logic was data, not code?**

The result is **BADGER** (Browser Automation Directed Graph Engine Ruleset) – a workflow DSL built around explicit, maintainable graphs of browser actions.

Here’s why it makes **reliable automation at scale** achievable.

## Automation as Data, Not Code

BADGER addresses Playwright’s scalability limitations by modeling automation as explicit graphs, turning browser actions and logic into structured data.

Each workflow is a directed graph composed of:

* **Nodes:** Clearly defined browser actions (`CLICK`, `INPUT_TEXT`, `BOOL_CONDITION`, etc.)
* **Edges:** Explicit control flow between nodes (conditions, loops, paths)

### Key Benefits

* **Easy Debugging:** Pinpoint failures within individual nodes and graph paths.
* **Reusable Components:** Build modular automation libraries with reusable nodes.
* **Visual Clarity:** Graph structure makes complex workflows easy to understand and maintain.

Let’s look at an example config!

```json
{
  "id": "bc2d338f-3d19-4824-bbd9-fdf8b68416c5",
  "workspace_id": "bc2d338f-3d19-4824-bbd9-fdf8b68416c5",
  "version_id": "bc2d338f-3d19-4824-bbd9-fdf8b68416c5",
  "version_number": 1,
  "created_at": "2025-05-21T00:00:00Z",
  "created_by": "user",
  "name": "X: Comment",
  "description": "Comment on a X tweet",
  "input_schema": {
    "$TWEET_URL": {
      "type": "string",
      "pattern": "^https://x.com/[^/]+/status/[^/]+$"
    },
    "$COMMENT": {
      "type": "string"
    },
    "$USER_NAME": {
      "type": "string"
    },
    "$PASSWORD": {
      "type": "string"
    },
    "required": ["$TWEET_URL", "$COMMENT", "$USER_NAME", "$PASSWORD"]
  },
  "output_schema": {},
  "nodes": [
    {
      "id": "41a01974-5d96-403d-bd4c-21f786bacf2b",
      "name": "Navigate to X Tweet",
      "action": "START",
      "parameters": {
        "url": "{$TWEET_URL}"
      }
    },
    {
      "id": "9df3a95e-0dd6-4115-98a3-3abf8b9b7f29",
      "name": "Is logged in?",
      "action": "BOOL_CONDITION",
      "parameters": {
        "execution": "STATIC",
        "comparison_value_1": "<<xpath://input[@autocomplete='username']>>",
        "comparison_value_2": null,
        "comparison_operator": "IS_NULL",
        "wait_time": 5000,
        "clear_cookies_on_false": true
      }
    },
    {
      "id": "c73ffce4-4f02-42ca-bff8-afdc816e3ca6",
      "name": "Type username",
      "action": "INPUT_TEXT",
      "parameters": {
        "execution": "STATIC",
        "selector": "//input[@autocomplete='username']",
        "text": "{$USER_NAME}",
        "wait_time": 25000
      }
    },
    {
      "id": "74052c6d-51be-4f1b-9fd5-304b5632eee3",
      "name": "Click Next",
      "action": "CLICK",
      "parameters": {
        "execution": "STATIC",
        "selector": "//button[normalize-space()='Next']",
        "wait_time": 25000
      }
    },
    {
      "id": "75f38414-62c8-453a-87d8-684847db0783",
      "name": "Type password",
      "action": "INPUT_TEXT",
      "parameters": {
        "execution": "STATIC",
        "selector": "//input[@type='password']",
        "text": "{$PASSWORD}",
        "wait_time": 25000
      }
    },
    {
      "id": "c3c0e1d5-1d88-4319-a811-35ad9bf32d3f",
      "name": "Click Log In",
      "action": "CLICK",
      "parameters": {
        "execution": "STATIC",
        "selector": "//button[normalize-space()='Log in']",
        "wait_time": 25000
      }
    },
    {
      "id": "25382829-81ae-43bc-b7c6-1d6be6a09cfb",
      "name": "Enter Comment",
      "action": "INPUT_TEXT",
      "parameters": {
        "execution": "STATIC",
        "selector": "//div[@data-testid='tweetTextarea_0' and @aria-label='Post text']",
        "text": "{$COMMENT}",
        "wait_time": 25000
      }
    },
    {
      "id": "b0ddd3b4-5197-4389-aedc-be37f96c1d44",
      "name": "Hit Reply",
      "action": "CLICK",
      "parameters": {
        "execution": "STATIC",
        "selector": "//button[normalize-space()='Reply']",
        "wait_time": 25000
      }
    },
    {
      "id": "e406fd72-85f9-4a28-bd09-0753cd8528fd",
      "name": "End",
      "action": "END",
      "parameters": {}
    }
  ],
  "edges": {
    "41a01974-5d96-403d-bd4c-21f786bacf2b": {
      "to": "9df3a95e-0dd6-4115-98a3-3abf8b9b7f29"
    },
    "9df3a95e-0dd6-4115-98a3-3abf8b9b7f29": {
      "true": "25382829-81ae-43bc-b7c6-1d6be6a09cfb",
      "false": "c73ffce4-4f02-42ca-bff8-afdc816e3ca6"
    },
    "c73ffce4-4f02-42ca-bff8-afdc816e3ca6": {
      "to": "74052c6d-51be-4f1b-9fd5-304b5632eee3"
    },
    "74052c6d-51be-4f1b-9fd5-304b5632eee3": {
      "to": "75f38414-62c8-453a-87d8-684847db0783"
    },
    "75f38414-62c8-453a-87d8-684847db0783": {
      "to": "c3c0e1d5-1d88-4319-a811-35ad9bf32d3f"
    },
    "25382829-81ae-43bc-b7c6-1d6be6a09cfb": {
      "to": "b0ddd3b4-5197-4389-aedc-be37f96c1d44"
    },
    "c3c0e1d5-1d88-4319-a811-35ad9bf32d3f": {
      "to": "25382829-81ae-43bc-b7c6-1d6be6a09cfb"
    },
    "b0ddd3b4-5197-4389-aedc-be37f96c1d44": {
      "to": "e406fd72-85f9-4a28-bd09-0753cd8528fd"
    }
  },
  "use_native_actions": true,
  "video_record_session": true,
  "encrypted_keys": [],
  "popup_xpaths": [],
  "auth_urls": [],
  "error_codes": []
}
```

This automation logs into X (if needed), posts a comment, and exits. 
One added benefit of the graph structure is that it's super easy to visualize:

<p align="center">
  <img width="422" alt="Screenshot 2025-05-21 at 7 20 01 PM" src="https://github.com/user-attachments/assets/f56d5c09-bb64-48e2-be70-978b131e6ef9" />
</p>

## Technical Deep Dive

BADGER offers a lot of fields to customize the behavior of your browser automations. When applicable, we're trying to set good defaults. Here's a deep dive on the most important ones. 

### Workflow Fields

* `use_native_actions`: Enables OS-level actions such as clicking and typing via a desktop application integration. This is particularly useful when standard JavaScript methods encounter issues with complex or secured web elements.
* `input_schema`: Defines the structure of input data provided by users or systems to the automation workflow. Commonly used for form-filling or dynamic content input, ensuring data provided meets website form validations.
* `output_schema`: Specifies the structured data format returned by the browser agent after workflow execution. Essential for standardizing outputs for downstream processes.

### Node Types

#### Action Nodes

* **Navigate**
  * `url`: URL to navigate to
* **Click**: Click on an element.
  * `selector`: DOM selector of the element to click. Used if execution is `STATIC`.
  * `prompt`: The prompt for the LLM describing the element to interact with. Used if execution is `LLM_DOM` or `LLM_VISION`.
  * `execution`: Determines interaction method (`STATIC`, `LLM_DOM`, `LLM_VISION`).
  * `human_mode`: Simulates human-like mouse movements and clicks.
* **InputText**: Inputs text into fields.
  * `text`: Text to input
  * `do_not_clear`: Prevents clearing existing text if true.
  * `submit_after_input`: Auto-submit after input.
  * `max_retries_with_reload`: In case the element cannot be found, the amount of retries with in-between reloads of the page.
* **InputSelect**: Inputs text into fields.
  * `value`: Target option.
  * `fuzzy_match`: Enables approximate matching of selection options with `value` using LLMs.
* **ExtractDatamodel**: Extracts strcutured data from page
  * `extract_data_model`: Expected schema to be extracted from page.
* **Screenshot**: Takes a screenshot of the page. Can be configured to be full-size by setting the `max_scrolls` parameter.
  * `selector`: Wait with taking the screenshot until XPATH appears in DOM.
  * `max_scrolls`: Number of scroll actions in between screenshots.

#### Condition and Loop Nodes

* **BoolCondition**: Handles logical branching
  * `comparison_operator`: `IS_NULL`, `EQUAL`, etc.
  * `comparison_value_1`, `comparison_value_2`: Values for logical comparison. Can be entries from session storage such as input data or elements on the webpage.
  * `execution`: Execution method (`STATIC`, `LLM_DOM`, `LLM_VISION`).

* **Loop**: Executes a repeated sequence of nodes.
  * `over`: Number or array to iterate over.
  * `variable_current_item`: Current iteration's item.
  * `variable_current_index`: Current iteration's index.

#### Specialized Nodes

* **Tfa**: Handles entering of 2FA codes in input fields.
  * `tfa_type`: 2FA method (`SMS`, `EMAIL`, `AUTHENTICATOR`).
  * `selector`: DOM selector for input.
  * `tfa_url`: URL associated with 2FA validation.

* **FileUpload**: Manages uploading files.
  *  `signed_file_url`: Secure URL that points to the file.
   
* **FileDownload**: Downloads files and serves throug signed_urls.
  * `metadata`: Any metadata to be sent together with the file URL of the downloaded file.
  * `continue_on_failed_download`: Continues workflow even if download fails.

* **TabManagement**: Controls browser tabs.
  * `tabAction`: `OPEN`, `CLOSE`, `SWITCH`
  * `tab_index`: Tab index for switching tabs.
  * `url`: URL for opening a tab.

* **UserInteraction**: Awaits manual user input or confirmation.
  * `expected_datamodel`: Data schema expected from user.
  * `timeout`: Maximum wait duration for user to submit data.

### Edges

Edges define control flow:

* `true`, `false`: Branching logic
* `loop_done`, `loop_not_done`: Loop control
* `to`: Sequential transitions

### Execution Strategies

* **STATIC:** Uses explicit selectors, fully deterministic.
* **LLM\_DOM:** Uses the DOM to fulfill the action e.g. finding the next element to click on.
* **LLM\_VISION:** Uses the screenshot to fulfill the action.

## Trade-Offs and Challenges

* **Initial Complexity:** A DSL requires upfront investment and design effort.
* **Overhead:** Abstraction may add minor performance cost, but this is negligible compared to the reliability benefits.

## Why BADGER Matters for Reliable Browser Agents

LLM-driven runtime prompting looks great in demos but fails in production. BADGER solves this by drawing a firm line between where LLMs help and where they don’t.

* **Deterministic at runtime:**
  Workflows run as explicit, structured graphs. Predictable, debuggable, and fast.

* **LLMs for targeted repair:**
  When things break, only specific DSL nodes are regenerated – keeping fixes local and understandable.

This approach lets you debug, version-control, and reliably scale browser automation workflows. 
It combines LLM flexibility exactly where it’s needed, with predictable, maintainable execution everywhere else. 
Here’s a [prior blog article](https://www.cloudcruise.com/blog/genesis) describing our overall system.
