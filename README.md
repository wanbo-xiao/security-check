# Security-check
Based on some Q&amp;A to generate a dashboard

## Demo
http://www.bobsyd.com/demo/security-check/

## Requirement 
1. A dashboard page using React.js to display Q&amp;As, a summary and a chart
2. A form page to enter those Q&amp;As

## Base Rule
|  Control Objective/Control  | Applicability | Implementation Level | Maturity of Control | Score |   
| --------------------------  | ------------- | -------------------- | ------------------- | ----- |
| Protecting against external end environmental threats | Yes | Partially Implemented | Established | 0.3 


1. Each entry looks like this, user need to answer **Applicability, Implementation Level and Maturity of Control**
1. Question Options(score)
    1. Applicability: "Yes" (1), "No"(0) and "Unsure" (0)
    1. Implementation Level: "Fully Implemented" (1), "Partially Implemented" (0.5), "Not Implemented" (0 )
    1. Maturity of Control: "Optimised" (1), "Integrated" (0.8), "Established" (0.6), "Informal" (0.4), "Undeveloped" (0.2),
1.  Entry score(0.3) = Applicability(1) * Implementation Level(0.5) * Maturity of Control(0.6)
1. The score of each parent category  = The average score of all its sub-category.

## Skill set 
1. React
1. Material-UI
1. Apexcharts  https://apexcharts.com/
