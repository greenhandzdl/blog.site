---
layout: post
title:  "告别plantUML,使用mermaid"
date: 2025-06-13
permalink: /告别plantUML,使用mermaid.html
---

# 拥抱Mermaid

## 缘起

之前有段时间,很痴迷于UML并且一直尝试用着**PlentUML**.但是,实际上**PlentUML**的编译器一点都不友好!!!所以,在大致的写下后,大部分时间都在尝试让编译器能够输出我想要的图像.

GPT的输出大部分是**mermaid**代码,于是对**Mermaid**开始感兴趣起来.得益于**Typora**对mermaid的支持,我对Mermaid开始有些心得,这篇文章大致涉及一些代码,但并不多,希望读者可以自行寻找文档进行查看,这篇文章仅仅介绍大概.

图表支持:

>
>
>流程图
>
>时序图
>
>类图
>
>状态图
>
>实体关系图
>
>用户旅程图
>
>甘特图
>
>饼图
>
>象限图
>
>需求图
>
>Gitgraph (Git) 
>
>C4
>
>思维导图
>
>时间线图
>
>ZenUML
>
>桑基图
>
>XY 图
>
>框图
>
>数据包图
>
>看板图
>
>架构图
>
>雷达图

## 语法

### [个性外观配置](https://mermaid.nodejs.cn/intro/syntax-reference.html#selecting-diagram-looks)



```mermaid
---
config:
  layout: elk # 布局算法elk,复杂的布局功能 
  look: handDrawn # 手绘
  theme: dark
---
flowchart TB
  A[Start] --> B{Decision}
  B -->|Yes| C[Continue]
  B -->|No| D[Stop]

```

```mermaid
---
config:
  layout: dagre # 经典算法
  look: classic #经典外观
  theme: default
---

flowchart LR
A[Start] --> B{Choose Path}
B -->|Option 1| C[Path 1]
B -->|Option 2| D[Path 2]
```

###  图表语法

#### [流程图](https://mermaid.nodejs.cn/syntax/flowchart.html)

```mermaid
flowchart LR 
	%% TB/TD - 从上到下
	%% BT - 从下到上
	%% RL - 从右到左 LR - 从左到右
    Start
    --> A@{ shape: rect , label: "This is the text in the box"}
    --> id>"This is the text in the box"]
    %% New syntax
		--> Stop
```

### [时序图](https://mermaid.nodejs.cn/syntax/sequenceDiagram.html)

```mermaid
sequenceDiagram
    participant Alice as 爱丽丝
    actor Bob
    
    %% 分组/框
    box transparent Frame
		actor Cal  
		end
		
    
    Bob->>Alice: Hi, <br/> Alice
    %% 可以类似于+/-来激活和取激活
    activate Alice
    Alice->>-Bob: Hi Bob
    
    Note right of Alice: Text in note
    
    
    destroy Alice
    create actor Alice_i
    
    Bob->>Alice_i : Bye Alice
    

```

```mermaid
sequenceDiagram
		%% loop
    Alice->John: Hello John, how are you?
    loop Every minute
        John-->Alice: Great!
    end
		%% alt
		 Alice->>Bob: Hello Bob, how are you?
    alt is sick
        Bob->>Alice: Not so good :(
    else is well
        Bob->>Alice: Feeling fresh like a daisy
    end
    
    opt Extra response
        Bob->>Alice: Thanks for asking
    end
    
    %% 平行线
    par Alice to Bob
        Alice->>Bob: Hello guys!
    and Alice to John
        Alice->>John: Hello guys!
    end
    
    %% 临界区
    critical Establish a connection to the DB
        Service-->DB: connect
    option Network timeout
        Service-->Service: Log error
    option Credentials rejected
        Service-->Service: Log different error
    end
    
    %% 中断
    Consumer-->API: Book something
    API-->BookingService: Start booking process
    break when the booking process fails
        API-->Consumer: show failure
    end
    API-->BillingService: Start billing process
```

#### 类图

```mermaid
---
title: Animal example
---
classDiagram
    note "From Duck till Zebra"
    Animal <|-- Duck
    note for Duck "can fly\ncan swim\ncan dive\ncan help in debugging"
    Animal <|-- Fish
    Animal <|-- Zebra
    Animal : +int age
    Animal : +String gender
    Animal: +isMammal()
    Animal: +mate()
    class Duck ["Duck"]{
        +String beakColor
        +swim()
        +quack()
    }
    class Fish{
        -int sizeInFeet
        -canEat()
    }
    class Zebra{
        +bool is_wild
        +run()
    }

```

```mermaid
classDiagram
%% General class
class Square~Shape~{
    int id
    List~int~ position
    setPoints(List~int~ points)
    getPoints() List~int~
}

Square : -List~string~ messages
Square : +setMessages(List~string~ messages)
Square : +getMessages() List~string~
Square : +getDistanceMatrix() List~List~int~~

```

```mermaid
classDiagram
classA <|-- classB : implements
classC *-- classD : composition
classE o-- classF : aggregation
%% < >关联
```

```mermaid
classDiagram
  bar ()-- foo

```

#### [状态图](https://mermaid.nodejs.cn/syntax/stateDiagram.html)

#### [实体图](https://mermaid.nodejs.cn/syntax/entityRelationshipDiagram.html)

#### [旅程图](https://mermaid.nodejs.cn/syntax/userJourney.html)

#### [甘特图](https://mermaid.nodejs.cn/syntax/gantt.html)

#### [饼图](https://mermaid.nodejs.cn/syntax/pie.html)

#### [象限图](https://mermaid.nodejs.cn/syntax/quadrantChart.html)

#### [需求图](https://mermaid.nodejs.cn/syntax/requirementDiagram.html)

#### [Git图](https://mermaid.nodejs.cn/syntax/gitgraph.html)

#### [C4](https://mermaid.nodejs.cn/syntax/c4.html)

#### [思维导图](https://mermaid.nodejs.cn/syntax/mindmap.html)

```mermaid
mindmap
  root((mindmap))
    Origins
      Long history
      ::icon(fa fa-book)
      Popularisation
        British popular psychology author Tony Buzan
    Research
      On effectiveness<br/>and features
      On Automatic creation
        Uses
            Creative techniques
            Strategic planning
            Argument mapping
    Tools
      Pen and paper
      Mermaid


```

#### [时间线图](https://mermaid.nodejs.cn/syntax/timeline.html)

```mermaid
timeline
    title History of Social Media Platform
    2002 : LinkedIn
    2004 : Facebook
         : Google
    2005 : YouTube
    2006 : Twitter

```

#### [时序图 zenUML](https://mermaid.nodejs.cn/syntax/zenuml.html)

#### [桑基图](https://mermaid.nodejs.cn/syntax/sankey.html)

#### [XY图](XY 图)

#### [框图](https://mermaid.nodejs.cn/syntax/block.html)

#### [数据包图](https://mermaid.nodejs.cn/syntax/packet.html)

#### [看板图](https://mermaid.nodejs.cn/syntax/kanban.html)

#### [架构图](https://mermaid.nodejs.cn/syntax/architecture.html)

####  [雷达图](https://mermaid.nodejs.cn/syntax/radar.html)
