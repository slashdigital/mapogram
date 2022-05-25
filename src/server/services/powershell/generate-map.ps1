[CmdletBinding()]
param (
    [Parameter(Mandatory)]
    [string]
    $Extent,

    [Parameter(Mandatory)]
    [string]
    $Output,

    [Parameter(Mandatory)]
    [string]
    $Project
)

C:\OSGeo4W\bin\qgis_process-qgis.bat run script:printlayoutextent --distance_units=meters --area_units=m2 --ellipsoid=EPSG:7030 --LAYOUT_NAME=MapogramView --EXTENT="$Extent" --OUTPUT_FILE="$Output" --PROJECT_PATH="$Project"