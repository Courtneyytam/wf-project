Webflow.require('ix').init([
  {"slug":"sign-up-interaction","name":"Sign Up Interaction","value":{"style":{},"triggers":[]}},
  {"slug":"fade-in-on-scroll-1","name":"Fade in on scroll 1","value":{"style":{"opacity":0,"x":"0px","y":"40px","z":"0px"},"triggers":[{"type":"scroll","offsetBot":"25%","stepsA":[{"opacity":1,"transition":"transform 800ms ease 0ms, opacity 800ms ease 0ms","x":"0px","y":"0px","z":"0px"}],"stepsB":[]}]}},
  {"slug":"team-tab-image","name":"Team tab image","value":{"style":{"opacity":0,"x":"50px","y":"0px","z":"0px"},"triggers":[{"type":"tabs","stepsA":[{"wait":"300ms"},{"opacity":1,"transition":"transform 500ms ease 0ms, opacity 500ms ease 0ms","x":"0px","y":"0px","z":"0px"}],"stepsB":[{"opacity":0,"transition":"transform 500ms ease 0ms, opacity 500ms ease 0ms","x":"50px","y":"0px","z":"0px"}]}]}},
  {"slug":"click-change-back","name":"Click Change back","value":{"style":{"opacity":1},"triggers":[{"type":"click","stepsA":[{"opacity":0,"transition":"opacity 200 ease 0, transform 200 ease 0"}],"stepsB":[{"opacity":1,"transition":"opacity 200 ease 0"}]}]}},
  {"slug":"team-tab-text","name":"Team tab text","value":{"style":{"opacity":0,"x":"50px","y":"0px","z":"0px"},"triggers":[{"type":"tabs","stepsA":[{"wait":600},{"opacity":1,"transition":"transform 500ms ease 0ms, opacity 500ms ease 0ms","x":"0px","y":"0px","z":"0px"}],"stepsB":[{"opacity":0,"transition":"transform 500ms ease 0ms, opacity 500ms ease 0ms","x":"50px","y":"0px","z":"0px"}]}]}},
  {"slug":"more-link","name":"More Link ","value":{"style":{},"triggers":[{"type":"hover","selector":".hover-line","descend":true,"preserve3d":true,"stepsA":[{"transition":"transform 400ms ease 0","x":"0px","y":"0px","z":"0px"}],"stepsB":[{"transition":"transform 400ms ease 0","x":"130%","y":"0px","z":"0px"},{"x":"-130%","y":"0px","z":"0px"}]},{"type":"hover","selector":".more-link-text","descend":true,"preserve3d":true,"stepsA":[{"transition":"transform 400ms ease 0","x":"5px","y":"0px","z":"0px"}],"stepsB":[{"transition":"transform 400ms ease 0","x":"0px","y":"0px","z":"0px"}]}]}},
  {"slug":"skill-slider-1","name":"Skill Slider 1","value":{"style":{"width":"0px"},"triggers":[{"type":"scroll","stepsA":[{"width":"96%","transition":"width 1000ms ease 0"}],"stepsB":[]}]}},
  {"slug":"skill-slider-2","name":"Skill Slider 2","value":{"style":{"width":"0px"},"triggers":[{"type":"scroll","stepsA":[{"width":"77%","transition":"width 1000ms ease 0"}],"stepsB":[]}]}},
  {"slug":"skill-slider-3","name":"Skill Slider 3","value":{"style":{"width":"0px"},"triggers":[{"type":"scroll","stepsA":[{"width":"85%","transition":"width 1000ms ease 0"}],"stepsB":[]}]}},
  {"slug":"skill-slider-4","name":"Skill Slider 4","value":{"style":{"width":"0px"},"triggers":[{"type":"scroll","stepsA":[{"width":"72%","transition":"width 1000ms ease 0"}],"stepsB":[]}]}},
  {"slug":"slide-right","name":"Slide Right","value":{"style":{"opacity":0,"x":"-60px","y":"0px","z":"0px"},"triggers":[{"type":"scroll","offsetBot":"0%","stepsA":[{"opacity":1,"transition":"transform 900ms ease 0, opacity 600ms ease 0","x":"0px","y":"0px","z":"0px"}],"stepsB":[]}]}},
  {"slug":"slide-up-1","name":"Slide Up 1","value":{"style":{"opacity":0,"x":"0px","y":"60px","z":"0px"},"triggers":[{"type":"scroll","offsetBot":"0%","stepsA":[{"opacity":1,"transition":"transform 900ms ease 0, opacity 600ms ease 0","x":"0px","y":"0px","z":"0px"}],"stepsB":[]}]}},
  {"slug":"slide-up-2","name":"Slide Up 2","value":{"style":{"opacity":0,"x":"0px","y":"60px","z":"0px"},"triggers":[{"type":"scroll","offsetBot":"0%","stepsA":[{"wait":"200ms"},{"opacity":1,"transition":"transform 900ms ease 0, opacity 600ms ease 0","x":"0px","y":"0px","z":"0px"}],"stepsB":[]}]}},
  {"slug":"slide-up-3","name":"Slide Up 3","value":{"style":{"opacity":0,"x":"0px","y":"60px","z":"0px"},"triggers":[{"type":"scroll","offsetBot":"0%","stepsA":[{"wait":"400ms"},{"opacity":1,"transition":"transform 900ms ease 0, opacity 600ms ease 0","x":"0px","y":"0px","z":"0px"}],"stepsB":[]}]}},
  {"slug":"slide-up-4","name":"Slide Up 4","value":{"style":{"opacity":0,"x":"0px","y":"60px","z":"0px"},"triggers":[{"type":"scroll","offsetBot":"0%","stepsA":[{"wait":"600ms"},{"opacity":1,"transition":"transform 900ms ease 0, opacity 600ms ease 0","x":"0px","y":"0px","z":"0px"}],"stepsB":[]}]}},
  {"slug":"slide-left","name":"Slide Left","value":{"style":{"opacity":0,"x":"60px","y":"0px","z":"0px"},"triggers":[{"type":"scroll","offsetBot":"0%","stepsA":[{"opacity":1,"transition":"transform 900ms ease 0, opacity 600ms ease 0","x":"0px","y":"0px","z":"0px"}],"stepsB":[]}]}},
  {"slug":"fade-right","name":"Fade right","value":{"style":{"opacity":0,"x":"-60px","y":"0px","z":"0px"},"triggers":[{"type":"scroll","offsetBot":"8%","stepsA":[{"opacity":1,"transition":"transform 800ms ease 0, opacity 600ms ease 0","x":"0px","y":"0px","z":"0px"}],"stepsB":[]}]}},
  {"slug":"fade-left","name":"Fade left","value":{"style":{"opacity":0,"x":"60px","y":"0px","z":"0px"},"triggers":[{"type":"scroll","offsetBot":"8%","stepsA":[{"opacity":1,"transition":"transform 800ms ease 0, opacity 600ms ease 0","x":"0px","y":"0px","z":"0px"}],"stepsB":[]}]}},
  {"slug":"move-to-origin-on-scroll","name":"Move To Origin On Scroll","value":{"style":{"x":"0px","y":"50px","z":"0px"},"triggers":[{"type":"scroll","offsetBot":"7%","stepsA":[{"transition":"transform 500ms ease 0","x":"0px","y":"0px","z":"0px"}],"stepsB":[]}]}},
  {"slug":"fade-up-3","name":"Fade up 3","value":{"style":{"opacity":0,"x":"0px","y":"60px","z":"0px"},"triggers":[{"type":"scroll","stepsA":[{"wait":"400ms"},{"opacity":1,"transition":"transform 800ms ease 0, opacity 600ms ease 0","x":"0px","y":"0px","z":"0px"}],"stepsB":[]}]}},
  {"slug":"hero-scroll-arrow","name":"Hero Scroll Arrow","value":{"style":{},"triggers":[{"type":"load","loopA":true,"stepsA":[{"transition":"transform 600ms linear 0","x":"0px","y":"5px","z":"0px"},{"transition":"transform 600ms linear 0","x":"0px","y":"0px","z":"0px"}],"stepsB":[]}]}},
  {"slug":"social-icon","name":"Social Icon","value":{"style":{},"triggers":[{"type":"hover","selector":".social-icon","descend":true,"preserve3d":true,"stepsA":[{"transition":"transform 200ms ease 0","x":"0px","y":"-32px","z":"0px"}],"stepsB":[{"transition":"transform 200ms ease 0","x":"0px","y":"0px","z":"0px"}]},{"type":"hover","selector":".social-icon-hover","descend":true,"preserve3d":true,"stepsA":[{"transition":"transform 200ms ease 0","x":"0px","y":"0px","z":"0px"}],"stepsB":[{"transition":"transform 200ms ease 0","x":"0px","y":"32px","z":"0px"}]}]}},
  {"slug":"hero-scroll-mouse","name":"Hero Scroll Mouse","value":{"style":{},"triggers":[{"type":"load","selector":".mouse-wheel-icon","descend":true,"loopA":true,"preserve3d":true,"stepsA":[{"opacity":0,"transition":"transform 1200ms ease 0, opacity 1200ms ease 0","x":"0px","y":"12px","z":"0px"},{"opacity":1,"x":"0px","y":"0px","z":"0px"}],"stepsB":[]}]}},
  {"slug":"gray-title-fade-in","name":"Gray title fade in","value":{"style":{"opacity":0,"x":"50px","y":"0px"},"triggers":[{"type":"scroll","offsetBot":"20%","stepsA":[{"opacity":1,"transition":"transform 1500ms ease 0ms, opacity 1500ms ease 0ms","x":"0px","y":"0px"}],"stepsB":[]}]}},
  {"slug":"black-title-fade-in","name":"Black title fade in","value":{"style":{"opacity":0},"triggers":[{"type":"scroll","offsetBot":"20%","stepsA":[{"wait":400},{"opacity":1,"transition":"opacity 1000ms ease 0ms"}],"stepsB":[]}]}},
  {"slug":"paragraph-fade-in","name":"Paragraph fade in","value":{"style":{"opacity":0},"triggers":[{"type":"scroll","offsetBot":"20%","stepsA":[{"wait":600},{"opacity":1,"transition":"opacity 1000ms ease 0ms"}],"stepsB":[]}]}},
  {"slug":"work-fade-in","name":"Work fade in","value":{"style":{"opacity":0,"x":"0px","y":"-12px"},"triggers":[{"type":"scroll","offsetBot":"20%","stepsA":[{"opacity":1,"transition":"transform 500ms ease 0ms, opacity 500ms ease 0ms","x":"0px","y":"0px"}],"stepsB":[]},{"type":"hover","stepsA":[{"opacity":0.8,"transition":"opacity 100ms ease 0ms"}],"stepsB":[{"opacity":1,"transition":"opacity 500ms ease 0ms"}]}]}},
  {"slug":"work-fade-in-3","name":"Work fade in 3","value":{"style":{"opacity":0,"x":"0px","y":"-12px"},"triggers":[{"type":"scroll","offsetBot":"20%","stepsA":[{"wait":300},{"opacity":1,"transition":"transform 500ms ease 0ms, opacity 500ms ease 0ms","x":"0px","y":"0px"}],"stepsB":[]},{"type":"hover","stepsA":[{"opacity":0.8,"transition":"opacity 100ms ease 0ms"}],"stepsB":[{"opacity":1,"transition":"opacity 500ms ease 0ms"}]}]}},
  {"slug":"work-fade-in-2","name":"Work fade in 2","value":{"style":{"opacity":0,"x":"0px","y":"-12px"},"triggers":[{"type":"scroll","offsetBot":"20%","stepsA":[{"wait":400},{"opacity":1,"transition":"transform 500ms ease 0ms, opacity 500ms ease 0ms","x":"0px","y":"0px"}],"stepsB":[]},{"type":"hover","stepsA":[{"opacity":0.8,"transition":"opacity 100ms ease 0ms"}],"stepsB":[{"opacity":1,"transition":"opacity 500ms ease 0ms"}]}]}}
]);

Webflow.require('ix2').init(
{
// EVENTS
"events":
{
    "e-bounce":
    {
        "id": "e-bounce",
        "eventTypeId": "MOUSE_OVER",
        "action":
        {
            "actionTypeId": "POP_EFFECT",
            "config":
            {
                "actionListId": "pop"
            },
            "instant": false
        },
        "mediaQueries": ["main", "medium", "small", "tiny"],
        "target":
        {
            "selector": ".e-bounce",
            "appliesTo": "CLASS"
        },
        "config":
        {
            "loop": false,
            "playInReverse": false,
            "scrollOffsetValue": null,
            "scrollOffsetUnit": null,
            "delay": 0,
            "direction": null,
            "effectIn": null
        }
    },

    "e-scroll-in":
    {
        "id": "e-scroll-in",
        "eventTypeId": "SCROLL_INTO_VIEW",
        "action":
        {
            "actionTypeId": "SLIDE_EFFECT",
            "config":
            {
                "actionListId": "slideInBottom"
            },
            "instant": false
        },
        "mediaQueries": ["main", "medium", "small", "tiny"],
        "target":
        {
            "selector": ".e-scroll-in",
            "appliesTo": "CLASS"
        },
        "config":
        {
            "loop": false,
            "playInReverse": false,
            "scrollOffsetValue": 0,
            "scrollOffsetUnit": "%",
            "delay": 0,
            "direction": "BOTTOM",
            "effectIn": true
        }
    },

    "e-scroll-in-right":
    {
        "id": "e-scroll-in-right",
        "eventTypeId": "SCROLL_INTO_VIEW",
        "action":
        {
            "id": "",
            "actionTypeId": "SLIDE_EFFECT",
            "config":
            {
                "actionListId": "slideInRight"
            },
            "instant": false
        },
        "mediaQueries": ["main", "medium", "small", "tiny"],
        "target":
        {
            "selector": ".e-scroll-in-right",
            "appliesTo": "CLASS"
        },
        "config":
        {
            "loop": false,
            "playInReverse": false,
            "scrollOffsetValue": 10,
            "scrollOffsetUnit": "%",
            "delay": 200,
            "direction": "RIGHT",
            "effectIn": true
        }
    },

    "e-scroll-in-left":
    {
        "id": "e-scroll-in-left",
        "eventTypeId": "SCROLL_INTO_VIEW",
        "action":
        {
            "id": "",
            "actionTypeId": "SLIDE_EFFECT",
            "config":
            {
                "actionListId": "slideInLeft"
            },
            "instant": false
        },
        "mediaQueries": ["main", "medium", "small", "tiny"],
        "target":
        {
            "selector": ".e-scroll-in-left",
            "appliesTo": "CLASS"
        },
        "config":
        {
            "loop": false,
            "playInReverse": false,
            "scrollOffsetValue": 10,
            "scrollOffsetUnit": "%",
            "delay": 200,
            "direction": "LEFT",
            "effectIn": true
        }
    },
    "e-ns-plane":
    {
      "id": "e-ns-plane",
      "eventTypeId": "SCROLLING_IN_VIEW",
      "action":
      {
        "id": "",
        "actionTypeId": "GENERAL_CONTINUOUS_ACTION",
        "config":
        {
          "actionListId": "a-ns-plane",
          "affectedElements":
          {},
          "duration": 0
        }
      },
      "mediaQueries": ["main", "medium", "small", "tiny"],
      "target":
      {
        "appliesTo": "CLASS",
        "selector": ".e-ns-plane"
      },
      "config": [
        {
          "continuousParameterGroupId": "a-ns-plane-cont",
          "smoothing": 96,
          "startsEntering": true,
          "addStartOffset": false,
          "addOffsetValue": 50,
          "startsExiting": false,
          "addEndOffset": false,
          "endOffsetValue": 50
        }]
    },

    //Apply .e-scale-effect to element to use both e-scale-down and e-scale-up hover animation
    "e-scale-down":
    {
        "id": "e-scale-down",
        "eventTypeId": "MOUSE_OVER",
        "action":
        {
            "id": "",
            "actionTypeId": "GENERAL_START_ACTION",
            "config":
            {
                "delay": 0,
                "easing": "",
                "duration": 0,
                "actionListId": "scaleDown",
                "affectedElements":
                {},
                "playInReverse": false,
                "autoStopEventId": "scaleUp"
            }
        },
        "mediaQueries": ["main"],
        "target":
        {
            "selector": ".e-scale-effect",
            "appliesTo": "CLASS"
        },
        "config":
        {
            "loop": false,
            "playInReverse": false,
            "scrollOffsetValue": null,
            "scrollOffsetUnit": null,
            "delay": null,
            "direction": null,
            "effectIn": null
        }
    },

    "e-scale-up":
    {
        "id": "e-scale-up",
        "eventTypeId": "MOUSE_OUT",
        "action":
        {
            "id": "",
            "actionTypeId": "GENERAL_START_ACTION",
            "config":
            {
                "delay": 0,
                "easing": "",
                "duration": 0,
                "actionListId": "scaleUp",
                "affectedElements":
                {},
                "playInReverse": false
            }
        },
        "mediaQueries": ["main"],
        "target":
        {
            "selector": ".e-scale-effect",
            "appliesTo": "CLASS"
        },
        "config":
        {
            "loop": false,
            "playInReverse": false,
            "scrollOffsetValue": null,
            "scrollOffsetUnit": null,
            "delay": null,
            "direction": null,
            "effectIn": null
        }
    },

    "e-parallax":
    {
        "id": "e-parallax",
        "eventTypeId": "SCROLLING_IN_VIEW",
        "action": {
          "id": "",
          "actionTypeId": "GENERAL_CONTINUOUS_ACTION",
          "config": {
            "actionListId": "a-parallax",
            "affectedElements": {},
            "duration": 0
          }
        },
        "mediaQueries": ["main", "medium", "small", "tiny"],
        "target": {
          "appliesTo": "CLASS",
          "selector": ".e-parallax"
        },
        "config":
        {
            "continuousParameterGroupId": "a-parallax-cont",
            "smoothing": 92,
            "startsEntering": true,
            "addStartOffset": false,
            "addOffsetValue": 50,
            "startsExiting": false,
            "addEndOffset": false,
            "endOffsetValue": 50
        }
    },

    //Apply .e-faq-animate on faq card
    "e-hover-in-faq":
    {
        "id": "e-hover-in-faq",
        "eventTypeId": "MOUSE_OVER",
        "action":
        {
            "id": "",
            "actionTypeId": "GENERAL_START_ACTION",
            "config":
            {
                "delay": 0,
                "easing": "",
                "duration": 0,
                "actionListId": "a-hover-in-faq",
                "affectedElements":
                {},
                "playInReverse": false
            }
        },
        "mediaQueries": ["main"],
        "target":
        {
            "selector": ".e-faq-animate",
            "appliesTo": "CLASS"
        },
        "config":
        {
            "loop": false,
            "playInReverse": false,
            "scrollOffsetValue": null,
            "scrollOffsetUnit": null,
            "delay": null,
            "direction": null,
            "effectIn": null
        }
    },

    "e-hover-out-faq":
    {
        "id": "e-hover-out-faq",
        "eventTypeId": "MOUSE_OUT",
        "action":
        {
            "id": "",
            "actionTypeId": "GENERAL_START_ACTION",
            "config":
            {
                "delay": 0,
                "easing": "",
                "duration": 0,
                "actionListId": "a-hover-out-faq",
                "affectedElements":
                {},
                "playInReverse": false
            }
        },
        "mediaQueries": ["main"],
        "target":
        {
            "selector": ".e-faq-animate",
            "appliesTo": "CLASS"
        },
        "config":
        {
            "loop": false,
            "playInReverse": false,
            "scrollOffsetValue": null,
            "scrollOffsetUnit": null,
            "delay": null,
            "direction": null,
            "effectIn": null
        }
    },

    "e-click-faq":
    {
        "id": "e-click-faq",
        "eventTypeId": "MOUSE_CLICK",
        "action":
        {
            "id": "",
            "actionTypeId": "GENERAL_START_ACTION",
            "config":
            {
                "delay": 0,
                "easing": "",
                "duration": 0,
                "actionListId": "a-click-faq",
                "affectedElements":
                {},
                "playInReverse": false
            }
        },
        "mediaQueries": ["main", "medium", "small", "tiny"],
        "target":
        {
            "selector": ".e-faq-animate",
            "appliesTo": "CLASS"
        },
        "config":
        {
            "loop": false,
            "playInReverse": false,
            "scrollOffsetValue": null,
            "scrollOffsetUnit": null,
            "delay": null,
            "direction": null,
            "effectIn": null
        },
    },

    "e-click-2-faq":
    {
        "id": "e-click-2-faq",
        "eventTypeId": "MOUSE_SECOND_CLICK",
        "action":
        {
            "id": "",
            "actionTypeId": "GENERAL_START_ACTION",
            "config":
            {
                "delay": 0,
                "easing": "",
                "duration": 0,
                "actionListId": "a-click-2-faq",
                "affectedElements":
                {},
                "playInReverse": true,
                "autoStopEventId": "e-click-faq"
            }
        },
        "mediaQueries": ["main", "medium", "small", "tiny"],
        "target":
        {
            "selector": ".e-faq-animate",
            "appliesTo": "ELEMENT"
        },
        "config":
        {
            "loop": false,
            "playInReverse": false,
            "scrollOffsetValue": null,
            "scrollOffsetUnit": null,
            "delay": null,
            "direction": null,
            "effectIn": null
        }
    },

},

// ACTIONS
"actionLists":
{
    "pop":
    {
        "id": "pop",
        "actionItemGroups": [
        {
            "actionItems": [
            {
                "actionTypeId": "TRANSFORM_SCALE",
                "config":
                {
                    "delay": 0,
                    "easing": "outQuart",
                    "duration": 250,
                    "target":
                    {
                        "id": "N/A",
                        "appliesTo": "TRIGGER_ELEMENT",
                        "useEventTarget": true
                    },
                    "xValue": 0.75,
                    "yValue": 0.75
                }
            }]
        },
        {
            "actionItems": [
            {
                "actionTypeId": "TRANSFORM_SCALE",
                "config":
                {
                    "delay": 0,
                    "easing": "outElastic",
                    "duration": 1000,
                    "target":
                    {
                        "id": "N/A",
                        "appliesTo": "TRIGGER_ELEMENT",
                        "useEventTarget": true
                    },
                    "xValue": 1,
                    "yValue": 1
                }
            }]
        }]
    },

    "growBigIn":
    {
        "id": "growBigIn",
        "useFirstGroupAsInitialState": true,
        "actionItemGroups": [
        {
            "actionItems": [
            {
                "actionTypeId": "STYLE_OPACITY",
                "config":
                {
                    "delay": 0,
                    "duration": 0,
                    "target":
                    {
                        "id": "N/A",
                        "appliesTo": "TRIGGER_ELEMENT",
                        "useEventTarget": true
                    },
                    "value": 0
                }
            }]
        },
        {
            "actionItems": [
            {
                "actionTypeId": "TRANSFORM_SCALE",
                "config":
                {
                    "delay": 0,
                    "duration": 0,
                    "target":
                    {
                        "id": "N/A",
                        "appliesTo": "TRIGGER_ELEMENT",
                        "useEventTarget": true
                    },
                    "xValue": 0,
                    "yValue": 0
                }
            }]
        },
        {
            "actionItems": [
            {
                "actionTypeId": "TRANSFORM_SCALE",
                "config":
                {
                    "delay": 0,
                    "easing": "outQuart",
                    "duration": 1000,
                    "target":
                    {
                        "id": "N/A",
                        "appliesTo": "TRIGGER_ELEMENT",
                        "useEventTarget": true
                    },
                    "xValue": 1,
                    "yValue": 1
                }
            },
            {
                "actionTypeId": "STYLE_OPACITY",
                "config":
                {
                    "delay": 0,
                    "easing": "outQuart",
                    "duration": 1000,
                    "target":
                    {
                        "id": "N/A",
                        "appliesTo": "TRIGGER_ELEMENT",
                        "useEventTarget": true
                    },
                    "value": 1
                }
            }]
        }]
    },

    "growIn":
    {
        "id": "growIn",
        "useFirstGroupAsInitialState": true,
        "actionItemGroups": [
        {
            "actionItems": [
            {
                "actionTypeId": "STYLE_OPACITY",
                "config":
                {
                    "delay": 0,
                    "duration": 0,
                    "target":
                    {
                        "id": "N/A",
                        "appliesTo": "TRIGGER_ELEMENT",
                        "useEventTarget": true
                    },
                    "value": 0
                }
            }]
        },
        {
            "actionItems": [
            {
                "actionTypeId": "TRANSFORM_SCALE",
                "config":
                {
                    "delay": 0,
                    "duration": 0,
                    "target":
                    {
                        "id": "N/A",
                        "appliesTo": "TRIGGER_ELEMENT",
                        "useEventTarget": true
                    },
                    "xValue": 0.7500000000000001,
                    "yValue": 0.7500000000000001
                }
            }]
        },
        {
            "actionItems": [
            {
                "actionTypeId": "TRANSFORM_SCALE",
                "config":
                {
                    "delay": 0,
                    "easing": "outQuart",
                    "duration": 1000,
                    "target":
                    {
                        "id": "N/A",
                        "appliesTo": "TRIGGER_ELEMENT",
                        "useEventTarget": true
                    },
                    "xValue": 1,
                    "yValue": 1
                }
            },
            {
                "actionTypeId": "STYLE_OPACITY",
                "config":
                {
                    "delay": 0,
                    "easing": "outQuart",
                    "duration": 1000,
                    "target":
                    {
                        "id": "N/A",
                        "appliesTo": "TRIGGER_ELEMENT",
                        "useEventTarget": true
                    },
                    "value": 1
                }
            }]
        }]
    },

    "slideInRight":
    {
        "id": "slideInRight",
        "useFirstGroupAsInitialState": true,
        "actionItemGroups": [
        {
            "actionItems": [
            {
                "actionTypeId": "STYLE_OPACITY",
                "config":
                {
                    "delay": 0,
                    "duration": 0,
                    "target":
                    {
                        "id": "N/A",
                        "appliesTo": "TRIGGER_ELEMENT",
                        "useEventTarget": true
                    },
                    "value": 0
                }
            }]
        },
        {
            "actionItems": [
            {
                "actionTypeId": "TRANSFORM_MOVE",
                "config":
                {
                    "delay": 0,
                    "duration": 0,
                    "target":
                    {
                        "id": "N/A",
                        "appliesTo": "TRIGGER_ELEMENT",
                        "useEventTarget": true
                    },
                    "xValue": 100,
                    "yValue": 0,
                    "xUnit": "PX",
                    "yUnit": "PX",
                    "zUnit": "PX"
                }
            }]
        },
        {
            "actionItems": [
            {
                "actionTypeId": "STYLE_OPACITY",
                "config":
                {
                    "delay": 0,
                    "easing": "outQuart",
                    "duration": 1000,
                    "target":
                    {
                        "id": "N/A",
                        "appliesTo": "TRIGGER_ELEMENT",
                        "useEventTarget": true
                    },
                    "value": 1
                }
            },
            {
                "actionTypeId": "TRANSFORM_MOVE",
                "config":
                {
                    "delay": 0,
                    "easing": "outQuart",
                    "duration": 1000,
                    "target":
                    {
                        "id": "N/A",
                        "appliesTo": "TRIGGER_ELEMENT",
                        "useEventTarget": true
                    },
                    "xValue": 0,
                    "yValue": 0,
                    "xUnit": "PX",
                    "yUnit": "PX",
                    "zUnit": "PX"
                }
            }]
        }]
    },

    "flipInLeft":
    {
        "id": "flipInLeft",
        "useFirstGroupAsInitialState": true,
        "actionItemGroups": [
        {
            "actionItems": [
            {
                "actionTypeId": "STYLE_OPACITY",
                "config":
                {
                    "duration": 0,
                    "delay": 0,
                    "target":
                    {
                        "id": "N/A",
                        "appliesTo": "TRIGGER_ELEMENT",
                        "useEventTarget": true
                    },
                    "value": 0
                }
            }]
        },
        {
            "actionItems": [
            {
                "actionTypeId": "TRANSFORM_ROTATE",
                "config":
                {
                    "delay": 0,
                    "duration": 0,
                    "target":
                    {
                        "id": "N/A",
                        "appliesTo": "TRIGGER_ELEMENT",
                        "useEventTarget": true
                    },
                    "xValue": 0,
                    "yValue": -90,
                    "zValue": 0,
                    "xUnit": "DEG",
                    "yUnit": "DEG",
                    "zUnit": "DEG"
                }
            }]
        },
        {
            "actionItems": [
            {
                "actionTypeId": "TRANSFORM_ROTATE",
                "config":
                {
                    "delay": 0,
                    "easing": "outQuart",
                    "duration": 1000,
                    "target":
                    {
                        "id": "N/A",
                        "appliesTo": "TRIGGER_ELEMENT",
                        "useEventTarget": true
                    },
                    "xValue": 0,
                    "yValue": 0,
                    "zValue": 0,
                    "xUnit": "DEG",
                    "yUnit": "DEG",
                    "zUnit": "DEG"
                }
            },
            {
                "actionTypeId": "STYLE_OPACITY",
                "config":
                {
                    "delay": 0,
                    "easing": "outQuart",
                    "duration": 1000,
                    "target":
                    {
                        "id": "N/A",
                        "appliesTo": "TRIGGER_ELEMENT",
                        "useEventTarget": true
                    },
                    "value": 1
                }
            }]
        }]
    },

    "slideInBottom":
    {
        "id": "slideInBottom",
        "useFirstGroupAsInitialState": true,
        "actionItemGroups": [
        {
            "actionItems": [
            {
                "actionTypeId": "STYLE_OPACITY",
                "config":
                {
                    "delay": 0,
                    "duration": 0,
                    "target":
                    {
                        "id": "N/A",
                        "appliesTo": "TRIGGER_ELEMENT",
                        "useEventTarget": true
                    },
                    "value": 0
                }
            }]
        },
        {
            "actionItems": [
            {
                "actionTypeId": "TRANSFORM_MOVE",
                "config":
                {
                    "delay": 0,
                    "duration": 0,
                    "target":
                    {
                        "id": "N/A",
                        "appliesTo": "TRIGGER_ELEMENT",
                        "useEventTarget": true
                    },
                    "xValue": 0,
                    "yValue": 100,
                    "xUnit": "PX",
                    "yUnit": "PX",
                    "zUnit": "PX"
                }
            }]
        },
        {
            "actionItems": [
            {
                "actionTypeId": "TRANSFORM_MOVE",
                "config":
                {
                    "delay": 0,
                    "easing": "outQuart",
                    "duration": 1000,
                    "target":
                    {
                        "id": "N/A",
                        "appliesTo": "TRIGGER_ELEMENT",
                        "useEventTarget": true
                    },
                    "xValue": 0,
                    "yValue": 0,
                    "xUnit": "PX",
                    "yUnit": "PX",
                    "zUnit": "PX"
                }
            },
            {
                "actionTypeId": "STYLE_OPACITY",
                "config":
                {
                    "delay": 0,
                    "easing": "outQuart",
                    "duration": 1000,
                    "target":
                    {
                        "id": "N/A",
                        "appliesTo": "TRIGGER_ELEMENT",
                        "useEventTarget": true
                    },
                    "value": 1
                }
            }]
        }]
    },

    "flipInRight":
    {
        "id": "flipInRight",
        "useFirstGroupAsInitialState": true,
        "actionItemGroups": [
        {
            "actionItems": [
            {
                "actionTypeId": "STYLE_OPACITY",
                "config":
                {
                    "delay": 0,
                    "duration": 0,
                    "target":
                    {
                        "id": "N/A",
                        "appliesTo": "TRIGGER_ELEMENT",
                        "useEventTarget": true
                    },
                    "value": 0
                }
            }]
        },
        {
            "actionItems": [
            {
                "actionTypeId": "TRANSFORM_ROTATE",
                "config":
                {
                    "delay": 0,
                    "duration": 0,
                    "target":
                    {
                        "id": "N/A",
                        "appliesTo": "TRIGGER_ELEMENT",
                        "useEventTarget": true
                    },
                    "xValue": 0,
                    "yValue": 90,
                    "zValue": 0,
                    "xUnit": "DEG",
                    "yUnit": "DEG",
                    "zUnit": "DEG"
                }
            }]
        },
        {
            "actionItems": [
            {
                "actionTypeId": "TRANSFORM_ROTATE",
                "config":
                {
                    "delay": 0,
                    "easing": "outQuart",
                    "duration": 1000,
                    "target":
                    {
                        "id": "N/A",
                        "appliesTo": "TRIGGER_ELEMENT",
                        "useEventTarget": true
                    },
                    "xValue": 0,
                    "yValue": 0,
                    "zValue": 0,
                    "xUnit": "DEG",
                    "yUnit": "DEG",
                    "zUnit": "DEG"
                }
            },
            {
                "actionTypeId": "STYLE_OPACITY",
                "config":
                {
                    "delay": 0,
                    "easing": "outQuart",
                    "duration": 1000,
                    "target":
                    {
                        "id": "N/A",
                        "appliesTo": "TRIGGER_ELEMENT",
                        "useEventTarget": true
                    },
                    "value": 1
                }
            }]
        }]
    },

    "slideInLeft":
    {
        "id": "slideInLeft",
        "useFirstGroupAsInitialState": true,
        "actionItemGroups": [
        {
            "actionItems": [
            {
                "actionTypeId": "STYLE_OPACITY",
                "config":
                {
                    "delay": 0,
                    "duration": 0,
                    "target":
                    {
                        "id": "N/A",
                        "appliesTo": "TRIGGER_ELEMENT",
                        "useEventTarget": true
                    },
                    "value": 0
                }
            }]
        },
        {
            "actionItems": [
            {
                "actionTypeId": "TRANSFORM_MOVE",
                "config":
                {
                    "delay": 0,
                    "duration": 0,
                    "target":
                    {
                        "id": "N/A",
                        "appliesTo": "TRIGGER_ELEMENT",
                        "useEventTarget": true
                    },
                    "xValue": -100,
                    "yValue": 0,
                    "xUnit": "PX",
                    "yUnit": "PX",
                    "zUnit": "PX"
                }
            }]
        },
        {
            "actionItems": [
            {
                "actionTypeId": "STYLE_OPACITY",
                "config":
                {
                    "delay": 0,
                    "easing": "outQuart",
                    "duration": 1000,
                    "target":
                    {
                        "id": "N/A",
                        "appliesTo": "TRIGGER_ELEMENT",
                        "useEventTarget": true
                    },
                    "value": 1
                }
            },
            {
                "actionTypeId": "TRANSFORM_MOVE",
                "config":
                {
                    "delay": 0,
                    "easing": "outQuart",
                    "duration": 1000,
                    "target":
                    {
                        "id": "N/A",
                        "appliesTo": "TRIGGER_ELEMENT",
                        "useEventTarget": true
                    },
                    "xValue": 0,
                    "yValue": 0,
                    "xUnit": "PX",
                    "yUnit": "PX",
                    "zUnit": "PX"
                }
            }]
        }]
    },

    "scaleDown":
    {
        "id": "scaleSmall",
        "actionItemGroups": [
        {
            "actionItems": [
            {
                "actionTypeId": "TRANSFORM_SCALE",
                "config":
                {
                    "delay": 0,
                    "easing": "ease",
                    "duration": 300,
                    "target":
                    {
                        "id": "N/A",
                        "appliesTo": "TRIGGER_ELEMENT",
                        "useEventTarget": true
                    },
                    "xValue": 0.94,
                    "yValue": 0.94,
                    "locked": true
                }
            }]
        }],
    },

    "scaleUp":
    {
        "id": "scaleUp",
        "actionItemGroups": [
        {
            "actionItems": [
            {
                "actionTypeId": "TRANSFORM_SCALE",
                "config":
                {
                    "delay": 0,
                    "easing": "ease",
                    "duration": 200,
                    "target":
                    {
                        "id": "N/A",
                        "appliesTo": "TRIGGER_ELEMENT",
                        "useEventTarget": true
                    },
                    "xValue": 1,
                    "yValue": 1,
                    "locked": true
                }
            }]
        }],
    },

    //FAQ Specific animation actions
    "a-hover-in-faq":
    {
        "id": "a-hover-in-faq",
        "title": "Question Card Hover",
        "actionItemGroups": [
        {
            "actionItems": [
            {
                "actionTypeId": "TRANSFORM_MOVE",
                "config":
                {
                    "delay": 0,
                    "easing": "ease",
                    "duration": 200,
                    "target":
                    {
                        "useEventTarget": "CHILDREN",
                        "selector": ".mini-question-text"
                    },
                    "xValue": 8,
                    "xUnit": "PX",
                    "yUnit": "PX",
                    "zUnit": "PX"
                }
            },
            {
                "actionTypeId": "STYLE_OPACITY",
                "config":
                {
                    "delay": 0,
                    "easing": "ease",
                    "duration": 200,
                    "target":
                    {
                        "useEventTarget": "CHILDREN",
                        "selector": ".plus-icon"
                    },
                    "value": 0.7,
                    "unit": ""
                }
            }]
        }],
        "useFirstGroupAsInitialState": false
    },

    "a-hover-out-faq":
    {
        "id": "a-hover-out-faq",
        "title": "Question Card Hover Out",
        "actionItemGroups": [
        {
            "actionItems": [
            {
                "actionTypeId": "TRANSFORM_MOVE",
                "config":
                {
                    "delay": 0,
                    "easing": "ease",
                    "duration": 200,
                    "target":
                    {
                        "useEventTarget": "CHILDREN",
                        "selector": ".mini-question-text"
                    },
                    "xValue": 0,
                    "xUnit": "PX",
                    "yUnit": "PX",
                    "zUnit": "PX"
                }
            },
            {
                "actionTypeId": "STYLE_OPACITY",
                "config":
                {
                    "delay": 0,
                    "easing": "ease",
                    "duration": 400,
                    "target":
                    {
                        "useEventTarget": "CHILDREN",
                        "selector": ".plus-icon"
                    },
                    "value": 0.4,
                    "unit": ""
                }
            }]
        }],
        "useFirstGroupAsInitialState": false
    },
    "a-parallax":
    {
          "id": "a-parallax",
          "title": "Text Moves on Scroll",
          "continuousParameterGroups": [{
            "id": "a-parallax-cont",
            "type": "SCROLL_PROGRESS",
            "parameterLabel": "Scroll",
          "continuousActionGroups": [{
            "keyframe": 0,
            "actionItems": [{
              "actionTypeId": "TRANSFORM_MOVE",
              "config": {
                "delay": 0,
                "easing": "",
                "duration": 500,
                "target": {
                  "useEventTarget": true
                },
                "xValue": 13,
                "xUnit": "%",
                "yUnit": "PX",
                "zUnit": "PX"
              }
            }, {
              "actionTypeId": "TRANSFORM_MOVE",
              "config": {
                "delay": 0,
                "easing": "",
                "duration": 500,
                "target": {},
                "xValue": 37,
                "xUnit": "%",
                "yUnit": "PX",
                "zUnit": "PX"
              }
            }]
          }, {
            "keyframe": 100,
            "actionItems": [{
              "actionTypeId": "TRANSFORM_MOVE",
              "config": {
                "delay": 0,
                "easing": "",
                "duration": 500,
                "target": {
                  "useEventTarget": true
                },
                "xValue": -38,
                "xUnit": "%",
                "yUnit": "PX",
                "zUnit": "PX"
              }
            }, {
              "actionTypeId": "TRANSFORM_MOVE",
              "config": {
                "delay": 0,
                "easing": "",
                "duration": 500,
                "target": {},
                "xValue": -4,
                "xUnit": "%",
                "yUnit": "PX",
                "zUnit": "PX"
              }
            }]
          }]
        }]
    },

    "a-click-faq":
    {
        "id": "a-click-faq",
        "title": "Question Card Open",
        "actionItemGroups": [
        {
            "actionItems": [
            {
                "id": "",
                "actionTypeId": "GENERAL_DISPLAY",
                "config":
                {
                    "delay": 0,
                    "easing": "",
                    "duration": 0,
                    "value": "none",
                    "target":
                    {
                        "selector": ".mini-answer"
                    }
                }
            },
            {
                "id": "",
                "actionTypeId": "STYLE_SIZE",
                "config":
                {
                    "delay": 0,
                    "easing": "",
                    "duration": 300,
                    "locked": false,
                    "target":
                    {
                        "selector": ".mini-answer"
                    },
                    "heightValue": 0,
                    "widthUnit": "PX",
                    "heightUnit": "PX"
                }
            },
            {
                "id": "",
                "actionTypeId": "STYLE_OPACITY",
                "config":
                {
                    "delay": 0,
                    "easing": "",
                    "duration": 300,
                    "target":
                    {
                        "selector": ".mini-answer"
                    },
                    "value": 1,
                    "unit": ""
                }
            },
            {
                "id": "",
                "actionTypeId": "TRANSFORM_ROTATE",
                "config":
                {
                    "delay": 0,
                    "easing": "",
                    "duration": 300,
                    "target":
                    {
                        "useEventTarget": "CHILDREN",
                        "selector": ".plus-icon-line-1"
                    },
                    "zValue": 90,
                    "xUnit": "DEG",
                    "yUnit": "DEG",
                    "zUnit": "DEG"
                }
            }]
        },
        {
            "actionItems": [
            {
                "id": "",
                "actionTypeId": "GENERAL_DISPLAY",
                "config":
                {
                    "delay": 0,
                    "easing": "",
                    "duration": 0,
                    "value": "block",
                    "target":
                    {
                        "useEventTarget": "CHILDREN",
                        "selector": ".mini-answer"
                    }
                }
            }]
        },
        {
            "actionItems": [
            {
                "id": "",
                "actionTypeId": "STYLE_SIZE",
                "config":
                {
                    "delay": 0,
                    "easing": "",
                    "duration": 200,
                    "locked": false,
                    "target":
                    {
                        "useEventTarget": "CHILDREN",
                        "selector": ".mini-answer"
                    },
                    "widthUnit": "PX",
                    "heightUnit": "AUTO"
                }
            },
            {
                "id": "",
                "actionTypeId": "STYLE_OPACITY",
                "config":
                {
                    "delay": 0,
                    "easing": "",
                    "duration": 200,
                    "target":
                    {
                        "useEventTarget": "CHILDREN",
                        "selector": ".mini-answer"
                    },
                    "value": 1,
                    "unit": ""
                }
            },
            {
                "id": "",
                "actionTypeId": "TRANSFORM_ROTATE",
                "config":
                {
                    "delay": 0,
                    "easing": "",
                    "duration": 200,
                    "target":
                    {
                        "useEventTarget": "CHILDREN",
                        "selector": ".plus-icon-line-1"
                    },
                    "zValue": 0,
                    "xUnit": "DEG",
                    "yUnit": "DEG",
                    "zUnit": "DEG"
                }
            }]
        }],
        "useFirstGroupAsInitialState": true
    },

    "a-click-2-faq":
    {
        "id": "a-click-2-faq",
        "title": "Question Card Close",
        "actionItemGroups": [
        {
            "actionItems": [
            {
                "id": "",
                "actionTypeId": "STYLE_SIZE",
                "config":
                {
                    "delay": 0,
                    "easing": "",
                    "duration": 200,
                    "locked": false,
                    "target":
                    {
                        "useEventTarget": "CHILDREN",
                        "selector": ".mini-answer"
                    },
                    "heightValue": 0,
                    "widthUnit": "PX",
                    "heightUnit": "PX"
                }
            },
            {
                "id": "",
                "actionTypeId": "STYLE_OPACITY",
                "config":
                {
                    "delay": 0,
                    "easing": "",
                    "duration": 200,
                    "target":
                    {
                        "useEventTarget": "CHILDREN",
                        "selector": ".mini-answer"
                    },
                    "value": 0,
                    "unit": ""
                }
            },
            {
                "id": "",
                "actionTypeId": "TRANSFORM_ROTATE",
                "config":
                {
                    "delay": 0,
                    "easing": "",
                    "duration": 200,
                    "target":
                    {
                        "useEventTarget": "CHILDREN",
                        "selector": ".plus-icon-line-1"
                    },
                    "zValue": 90,
                    "xUnit": "DEG",
                    "yUnit": "DEG",
                    "zUnit": "DEG"
                }
            }]
        },
        {
            "actionItems": [
            {
                "id": "",
                "actionTypeId": "GENERAL_DISPLAY",
                "config":
                {
                    "delay": 0,
                    "easing": "",
                    "duration": 0,
                    "value": "none",
                    "target":
                    {
                        "useEventTarget": "CHILDREN",
                        "selector": ".mini-answer"
                    }
                }
            }]
        }],
        "useFirstGroupAsInitialState": false
    },

    "a-ns-plane":
    {
            "id": "a-ns-plane",
            "title": "Paperplane Icon",
            "continuousParameterGroups": [
            {
                "id": "a-ns-plane-cont",
                "type": "SCROLL_PROGRESS",
                "parameterLabel": "Scroll",
                "continuousActionGroups": [
                {
                    "keyframe": 0,
                    "actionItems": [
                    {
                        "id": "",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config":
                        {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target":
                            {
                                "useEventTarget": true,
                                "id": "ns-plane"
                            },
                            "xValue": -60,
                            "yValue": 60,
                            "xUnit": "%",
                            "yUnit": "%",
                            "zUnit": "PX"
                        }
                    },
                    {
                        "id": "",
                        "actionTypeId": "TRANSFORM_SCALE",
                        "config":
                        {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target":
                            {
                                "useEventTarget": true,
                                "id": "ns-plane"
                            },
                            "xValue": 1,
                            "yValue": 1,
                            "locked": true
                        }
                    }]
                },
                {
                    "keyframe": 40,
                    "actionItems": [
                    {
                        "id": "",
                        "actionTypeId": "TRANSFORM_SCALE",
                        "config":
                        {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target":
                            {
                                "useEventTarget": true,
                                "id": "ns-plane"
                            },
                            "xValue": 1.2,
                            "yValue": 1.2,
                            "locked": true
                        }
                    }]
                },
                {
                    "keyframe": 100,
                    "actionItems": [
                    {
                        "id": "",
                        "actionTypeId": "TRANSFORM_MOVE",
                        "config":
                        {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target":
                            {
                                "useEventTarget": true,
                                "id": "ns-plane"
                            },
                            "xValue": 120,
                            "yValue": -120,
                            "xUnit": "%",
                            "yUnit": "%",
                            "zUnit": "PX"
                        }
                    },
                    {
                        "id": "",
                        "actionTypeId": "TRANSFORM_SCALE",
                        "config":
                        {
                            "delay": 0,
                            "easing": "",
                            "duration": 500,
                            "target":
                            {
                                "useEventTarget": true,
                                "id": "ns-plane"
                            },
                            "xValue": 1,
                            "yValue": 1,
                            "locked": true
                        }
                    }]
                }]
            }]
        },



},

"site":
{
    "mediaQueries": [
    {
        "key": "main",
        "min": 992,
        "max": 10000
    },
    {
        "key": "medium",
        "min": 768,
        "max": 991
    },
    {
        "key": "small",
        "min": 480,
        "max": 767
    },
    {
        "key": "tiny",
        "min": 0,
        "max": 479
    }]
}
});
