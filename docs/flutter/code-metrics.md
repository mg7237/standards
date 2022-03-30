# [Dart Code Metrics](https://dartcodemetrics.dev/)

Dart Code Metrics is a static analysis tool that helps you analyse and improve your code quality. It checks for anti-patterns and reports code metrics to help you monitor the quality of your code and improve it.

-   [Key Features](#key-features)
-   [Code Quality Rules](#code-quality-rules)
-   [Code Metrics](#code-metrics)
-   [Anti-Patterns](#anti-patterns)
-   [Configurations](#configurations)
-   [Command Line Interface](#command-line-interface)
-   [Rules Shortlist](#rules-shortlist)

### Key Features:

-   Unused files identification
-   Unused code identification
-   Automated Code Quality Validation

### Code Quality Rules

-   Analyzes each line of code and identifies specific lines of code where code quality rule failed along with the type of rule failed.
-   Ability to choose and apply rules which makes sense for the dev team.
-   Ability to configure the severity level of each rule and report them as either style, performance, warning, or error.
-   List of possible metrics and underlying validations can be found [here](https://dartcodemetrics.dev/docs/rules/overview).

### Code Metrics

-   Code Quality Standard Quantifiable Rules which are configurable.
-   Ability to define which metric apply vs. which don’t so a team can focus on what metrics matters to them rather than trying to fix all rules.
-   Quantifiable Rules to check code base, generate metrics and validate against configured threshold levels against each rule.
-   Ability to customize metrics threshold. For example, Cyclomatic complexity violation could be configured with threshold factor of 20 or 30 implying the rule is considered violated if the cyclomatic complexity of any method goes beyond the threshold limit which is configurable.
-   Reporting metrics available in JSON, HTML, plain text etc. formats.
-   List of possible metrics and underlying validations can be found [here](https://dartcodemetrics.dev/docs/metrics/overview).

### Anti-Patterns

Identifies long methods and long Parameter Lists which are recommended to be refactored and simplified. More details [here](https://dartcodemetrics.dev/docs/anti-patterns/overview).

### Configurations

-   Add `pubspec.yaml` entry to add code metrics plugin: <br>
    `$ flutter pub add --dev dart_code_metrics`

-   To configure the package add a `dart_code_metrics` entry to `analysis_options.yaml`. This configuration is used by both CLI and the analyzer plugin. <br>

```
dart_code_metrics:
metrics:
 - ... # configures the list of reported metrics
 metrics-exclude:
 - ... # configures the list of files that should be ignored by metrics
 rules:
 - ... # configures the list of rules
 rules-exclude:
 - ... # configures the list of files that should be ignored by rules
 anti-patterns:
 - ... # configures the list of anti-patterns
```

-   Find More details [here](https://dartcodemetrics.dev/docs/getting-started/configuration)

### Command Line Interface

Following is the command line statement which can be used to run the code metrics tool. <br>

`flutter pub run dart_code_metrics:metrics <command> lib` <br>

**Available Commands:**

-   `analyze`: Reports code metrics, rules and anti-patterns violations.
-   `check-unused-files`: Checks unused \*.dart files.
-   `check-unused-code`: Checks unused code in \*.dart files.

**Supported Formats:**

Report from Code Metrics plugin can be output in any one of the following formats:

-   Console
-   GitHub
-   Checkstyle
-   Codeclimate
-   HTML
-   JSON

**Rules Shortlist**

Following rules have been shortlisted to be applied and must be fixed before pushing the code to git. More details about individual rules and metrics can be found [here](https://dartcodemetrics.dev/docs/rules/overview).

| Rule          | Description                                                                                      |
| ------------- | ------------------------------------------------------------------------------------------------ |
| avoid-dynamic | Warns when dynamic type is used as variable type in declaration, return type of a function, etc. |
| TBD           | Add rules post review                                                                            |
