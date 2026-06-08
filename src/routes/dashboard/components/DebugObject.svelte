<script>
    let minimized = $state(true);
</script>

<div class="debug-object-view {minimized ? 'minimized' : ''}">
    <div class="header">
        <div>
            Reactive State Debugger Thing
        </div>
        <div onclick={minimized = !minimized} class="minimized-button-container">
            <div class="minimize-button"></div>
        </div>
    </div>
    <div class="content">
<pre>
<slot/>
</pre>
    </div>
</div>

<style lang="scss">
    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap');

    .debug-object-view {
        max-height: 500px;
        width: 300px;
        outline: 2px solid white;
        outline-offset: -3px;
        font-family: 'JetBrains Mono';
        font-size: 12px;
        position: fixed;
        bottom: 1rem;
        right: 1rem;
        background: black;
        color: white;
        display: grid;
        grid-template-rows: 32px 1fr;

        .header {
            border-bottom: 2px solid white;
            display: flex;
            align-items: center;
            font-weight: 800;
            text-transform: uppercase;
            padding: 0 8px;
            justify-content: space-between;
            margin: 2px;

            .minimized-button-container {
                height: 100%;
                display: grid;
                place-items: center;
                cursor: pointer;

                .minimize-button {
                    height: 2px;
                    width: 16px;
                    background: white;
                }
            }
        }


        .content {
            overflow-y: scroll;
            padding: 8px;

            &::-webkit-scrollbar {
                display: none;
            }
        }

        pre {
            margin: 0;
            padding: 0;
        }

        &.minimized {
            grid-template-rows: 32px 0;

            .header {
                border-color: transparent;
            }

            .content {
                display: none;
            }
        }
    }
</style>