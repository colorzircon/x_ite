/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
 *
 * All rights reserved. Holger Seelig <holger.seelig@yahoo.de>.
 *
 * The copyright notice above does not evidence any actual of intended
 * publication of such source code, and is an unpublished work by create3000.
 * This material contains CONFIDENTIAL INFORMATION that is the property of
 * create3000.
 *
 * No permission is granted to copy, distribute, or create derivative works from
 * the contents of this software, in whole or in part, without the prior written
 * permission of create3000.
 *
 * NON-MILITARY USE ONLY
 *
 * All create3000 software are effectively free software with a non-military use
 * restriction. It is free. Well commented source is provided. You may reuse the
 * source in any way you please with the exception anything that uses it must be
 * marked to indicate is contains 'non-military use only' components.
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
 *
 * This file is part of the X_ITE Project.
 *
 * X_ITE is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * X_ITE is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ([
	"x_ite/Components/Networking/Anchor", // VRML
	"x_ite/Components/Shape/Appearance", // VRML
	"x_ite/Components/Geometry2D/Arc2D",
	"x_ite/Components/Geometry2D/ArcClose2D",
	"x_ite/Components/Sound/AudioClip",
	"x_ite/Components/EnvironmentalEffects/Background", // VRML
	//"x_ite/Components/RigidBodyPhysics/BallJoint",
	"x_ite/Components/Navigation/Billboard", // VRML
	"x_ite/Components/EventUtilities/BooleanFilter",
	"x_ite/Components/EventUtilities/BooleanSequencer",
	"x_ite/Components/EventUtilities/BooleanToggle",
	"x_ite/Components/EventUtilities/BooleanTrigger",
	"x_ite/Components/ParticleSystems/BoundedPhysicsModel",
	"x_ite/Components/Geometry3D/Box", // VRML
	"x_ite/Components/CADGeometry/CADAssembly",
	"x_ite/Components/CADGeometry/CADFace",
	"x_ite/Components/CADGeometry/CADLayer",
	"x_ite/Components/CADGeometry/CADPart",
	"x_ite/Components/Geometry2D/Circle2D",
	"x_ite/Components/Rendering/ClipPlane",
	//"x_ite/Components/RigidBodyPhysics/CollidableOffset",
	//"x_ite/Components/RigidBodyPhysics/CollidableShape",
	"x_ite/Components/Navigation/Collision", // VRML
	//"x_ite/Components/RigidBodyPhysics/CollisionCollection",
	//"x_ite/Components/RigidBodyPhysics/CollisionSensor",
	//"x_ite/Components/RigidBodyPhysics/CollisionSpace",
	"x_ite/Components/Rendering/Color", // VRML
	"x_ite/Components/Followers/ColorChaser",
	"x_ite/Components/Followers/ColorDamper",
	"x_ite/Components/Interpolation/ColorInterpolator", // VRML
	"x_ite/Components/Rendering/ColorRGBA",
	"x_ite/Components/CubeMapTexturing/ComposedCubeMapTexture",
	"x_ite/Components/Shaders/ComposedShader",
	//"x_ite/Components/Texturing3D/ComposedTexture3D",
	"x_ite/Components/Geometry3D/Cone", // VRML
	"x_ite/Components/ParticleSystems/ConeEmitter",
	//"x_ite/Components/RigidBodyPhysics/Contact",
	//"x_ite/Components/NURBS/Contour2D",
	//"x_ite/Components/NURBS/ContourPolyline2D",
	"x_ite/Components/Rendering/Coordinate", // VRML
	"x_ite/Components/Followers/CoordinateChaser",
	"x_ite/Components/Followers/CoordinateDamper",
	"x_ite/Components/NURBS/CoordinateDouble",
	"x_ite/Components/Interpolation/CoordinateInterpolator", // VRML
	"x_ite/Components/Interpolation/CoordinateInterpolator2D",
	"x_ite/Components/Geometry3D/Cylinder", // VRML
	"x_ite/Components/PointingDeviceSensor/CylinderSensor", // VRML
	//"x_ite/Components/DIS/DISEntityManager",
	//"x_ite/Components/DIS/DISEntityTypeMapping",
	"x_ite/Components/Lighting/DirectionalLight", // VRML
	"x_ite/Components/Geometry2D/Disk2D",
	//"x_ite/Components/RigidBodyPhysics/DoubleAxisHingeJoint",
	"x_ite/Components/Interpolation/EaseInEaseOut",
	"x_ite/Components/Geometry3D/ElevationGrid", // VRML
	//"x_ite/Components/DIS/EspduTransform",
	"x_ite/Components/ParticleSystems/ExplosionEmitter",
	"x_ite/Components/Geometry3D/Extrusion", // VRML
	//"x_ite/Components/Shape/FillProperties",
	"x_ite/Components/Shaders/FloatVertexAttribute",
	"x_ite/Components/EnvironmentalEffects/Fog", // VRML
	//"x_ite/Components/EnvironmentalEffects/FogCoordinate",
	"x_ite/Components/Text/FontStyle", // VRML
	"x_ite/Components/ParticleSystems/ForcePhysicsModel",
	"x_ite/Components/CubeMapTexturing/GeneratedCubeMapTexture",
	"x_ite/Components/Geospatial/GeoCoordinate",
	"x_ite/Components/Geospatial/GeoElevationGrid",
	"x_ite/Components/Geospatial/GeoLOD",
	"x_ite/Components/Geospatial/GeoLocation",
	"x_ite/Components/Geospatial/GeoMetadata",
	"x_ite/Components/Geospatial/GeoOrigin",
	"x_ite/Components/Geospatial/GeoPositionInterpolator",
	"x_ite/Components/Geospatial/GeoProximitySensor",
	"x_ite/Components/Geospatial/GeoTouchSensor",
	"x_ite/Components/Geospatial/GeoTransform",
	"x_ite/Components/Geospatial/GeoViewpoint",
	"x_ite/Components/Grouping/Group", // VRML
	//"x_ite/Components/H-Anim/HAnimDisplacer",
	//"x_ite/Components/H-Anim/HAnimHumanoid",
	//"x_ite/Components/H-Anim/HAnimJoint",
	//"x_ite/Components/H-Anim/HAnimSegment",
	//"x_ite/Components/H-Anim/HAnimSite",
	"x_ite/Components/CubeMapTexturing/ImageCubeMapTexture",
	"x_ite/Components/Texturing/ImageTexture", // VRML
	//"x_ite/Components/Texturing3D/ImageTexture3D",
	"x_ite/Components/Geometry3D/IndexedFaceSet", // VRML
	"x_ite/Components/Rendering/IndexedLineSet", // VRML
	"x_ite/Components/CADGeometry/IndexedQuadSet",
	"x_ite/Components/Rendering/IndexedTriangleFanSet",
	"x_ite/Components/Rendering/IndexedTriangleSet",
	"x_ite/Components/Rendering/IndexedTriangleStripSet",
	"x_ite/Components/Networking/Inline", // VRML
	"x_ite/Components/EventUtilities/IntegerSequencer",
	"x_ite/Components/EventUtilities/IntegerTrigger",
	"x_ite/Components/KeyDeviceSensor/KeySensor",
	"x_ite/Components/Navigation/LOD", // VRML
	"x_ite/Components/Layering/Layer",
	"x_ite/Components/Layering/LayerSet",
	"x_ite/Components/Layout/Layout",
	"x_ite/Components/Layout/LayoutGroup",
	"x_ite/Components/Layout/LayoutLayer",
	//"x_ite/Components/Picking/LinePickSensor",
	"x_ite/Components/Shape/LineProperties",
	"x_ite/Components/Rendering/LineSet",
	"x_ite/Components/Networking/LoadSensor",
	"x_ite/Components/EnvironmentalEffects/LocalFog",
	"x_ite/Components/Shape/Material", // VRML
	"x_ite/Components/Shaders/Matrix3VertexAttribute",
	"x_ite/Components/Shaders/Matrix4VertexAttribute",
	"x_ite/Components/Core/MetadataBoolean",
	"x_ite/Components/Core/MetadataDouble",
	"x_ite/Components/Core/MetadataFloat",
	"x_ite/Components/Core/MetadataInteger",
	"x_ite/Components/Core/MetadataSet",
	"x_ite/Components/Core/MetadataString",
	//"x_ite/Components/RigidBodyPhysics/MotorJoint",
	"x_ite/Components/Texturing/MovieTexture", // VRML
	//"x_ite/Components/Texturing/MultiTexture",
	//"x_ite/Components/Texturing/MultiTextureCoordinate",
	//"x_ite/Components/Texturing/MultiTextureTransform",
	"x_ite/Components/Navigation/NavigationInfo", // VRML
	"x_ite/Components/Rendering/Normal", // VRML
	"x_ite/Components/Interpolation/NormalInterpolator", // VRML
	//"x_ite/Components/NURBS/NurbsCurve",
	//"x_ite/Components/NURBS/NurbsCurve2D",
	//"x_ite/Components/NURBS/NurbsOrientationInterpolator",
	//"x_ite/Components/NURBS/NurbsPatchSurface",
	//"x_ite/Components/NURBS/NurbsPositionInterpolator",
	//"x_ite/Components/NURBS/NurbsSet",
	//"x_ite/Components/NURBS/NurbsSurfaceInterpolator",
	//"x_ite/Components/NURBS/NurbsSweptSurface",
	//"x_ite/Components/NURBS/NurbsSwungSurface",
	//"x_ite/Components/NURBS/NurbsTextureCoordinate",
	//"x_ite/Components/NURBS/NurbsTrimmedSurface",
	"x_ite/Components/Followers/OrientationChaser",
	"x_ite/Components/Followers/OrientationDamper",
	"x_ite/Components/Interpolation/OrientationInterpolator", // VRML
	"x_ite/Components/Navigation/OrthoViewpoint",
	//"x_ite/Components/Shaders/PackagedShader",
	"x_ite/Components/ParticleSystems/ParticleSystem",
	//"x_ite/Components/Picking/PickableGroup",
	"x_ite/Components/Texturing/PixelTexture", // VRML
	//"x_ite/Components/Texturing3D/PixelTexture3D",
	"x_ite/Components/PointingDeviceSensor/PlaneSensor", // VRML
	"x_ite/Components/ParticleSystems/PointEmitter",
	"x_ite/Components/Lighting/PointLight", // VRML
	//"x_ite/Components/Picking/PointPickSensor",
	"x_ite/Components/Rendering/PointSet", // VRML
	"x_ite/Components/Geometry2D/Polyline2D",
	"x_ite/Components/ParticleSystems/PolylineEmitter",
	"x_ite/Components/Geometry2D/Polypoint2D",
	"x_ite/Components/Followers/PositionChaser",
	"x_ite/Components/Followers/PositionChaser2D",
	"x_ite/Components/Followers/PositionDamper",
	"x_ite/Components/Followers/PositionDamper2D",
	"x_ite/Components/Interpolation/PositionInterpolator", // VRML
	"x_ite/Components/Interpolation/PositionInterpolator2D",
	//"x_ite/Components/Picking/PrimitivePickSensor",
	//"x_ite/Components/Shaders/ProgramShader",
	"x_ite/Components/EnvironmentalSensor/ProximitySensor", // VRML
	"x_ite/Components/CADGeometry/QuadSet",
	//"x_ite/Components/DIS/ReceiverPdu",
	"x_ite/Components/Geometry2D/Rectangle2D",
	//"x_ite/Components/RigidBodyPhysics/RigidBody",
	//"x_ite/Components/RigidBodyPhysics/RigidBodyCollection",
	"x_ite/Components/Followers/ScalarChaser",
	"x_ite/Components/Followers/ScalarDamper",
	"x_ite/Components/Interpolation/ScalarInterpolator", // VRML
	"x_ite/Components/Layout/ScreenFontStyle",
	"x_ite/Components/Layout/ScreenGroup",
	"x_ite/Components/Scripting/Script", // VRML
	"x_ite/Components/Shaders/ShaderPart",
	//"x_ite/Components/Shaders/ShaderProgram",
	"x_ite/Components/Shape/Shape", // VRML
	//"x_ite/Components/DIS/SignalPdu",
	//"x_ite/Components/RigidBodyPhysics/SingleAxisHingeJoint",
	//"x_ite/Components/RigidBodyPhysics/SliderJoint",
	"x_ite/Components/Sound/Sound", // VRML
	"x_ite/Components/Geometry3D/Sphere", // VRML
	"x_ite/Components/PointingDeviceSensor/SphereSensor", // VRML
	"x_ite/Components/Interpolation/SplinePositionInterpolator",
	"x_ite/Components/Interpolation/SplinePositionInterpolator2D",
	"x_ite/Components/Interpolation/SplineScalarInterpolator",
	"x_ite/Components/Lighting/SpotLight", // VRML
	"x_ite/Components/Interpolation/SquadOrientationInterpolator",
	"x_ite/Components/Grouping/StaticGroup",
	//"x_ite/Components/KeyDeviceSensor/StringSensor",
	"x_ite/Components/ParticleSystems/SurfaceEmitter",
	"x_ite/Components/Grouping/Switch", // VRML
	"x_ite/Components/Followers/TexCoordChaser2D",
	"x_ite/Components/Followers/TexCoordDamper2D",
	"x_ite/Components/Text/Text", // VRML
	"x_ite/Components/EnvironmentalEffects/TextureBackground",
	"x_ite/Components/Texturing/TextureCoordinate", // VRML
	"x_ite/Components/Texturing3D/TextureCoordinate3D",
	"x_ite/Components/Texturing3D/TextureCoordinate4D",
	//"x_ite/Components/Texturing/TextureCoordinateGenerator",
	"x_ite/Components/Texturing/TextureProperties",
	"x_ite/Components/Texturing/TextureTransform", // VRML
	"x_ite/Components/Texturing3D/TextureTransform3D",
	"x_ite/Components/Texturing3D/TextureTransformMatrix3D",
	"x_ite/Components/Time/TimeSensor", // VRML
	"x_ite/Components/EventUtilities/TimeTrigger",
	//"x_ite/Components/Titania/TouchGroup",
	"x_ite/Components/PointingDeviceSensor/TouchSensor", // VRML
	"x_ite/Components/Grouping/Transform", // VRML
	"x_ite/Components/EnvironmentalSensor/TransformSensor",
	//"x_ite/Components/DIS/TransmitterPdu",
	"x_ite/Components/Rendering/TriangleFanSet",
	"x_ite/Components/Rendering/TriangleSet",
	"x_ite/Components/Geometry2D/TriangleSet2D",
	"x_ite/Components/Rendering/TriangleStripSet",
	"x_ite/Components/Shape/TwoSidedMaterial",
	//"x_ite/Components/RigidBodyPhysics/UniversalJoint",
	"x_ite/Components/Navigation/Viewpoint", // VRML
	"x_ite/Components/Navigation/ViewpointGroup",
	"x_ite/Components/Layering/Viewport",
	"x_ite/Components/EnvironmentalSensor/VisibilitySensor", // VRML
	"x_ite/Components/ParticleSystems/VolumeEmitter",
	//"x_ite/Components/Picking/VolumePickSensor",
	"x_ite/Components/ParticleSystems/WindPhysicsModel",
	"x_ite/Components/Core/WorldInfo", // VRML
],
function (Anchor,
          Appearance,
          Arc2D,
          ArcClose2D,
          AudioClip,
          Background,
          //BallJoint,
          Billboard,
          BooleanFilter,
          BooleanSequencer,
          BooleanToggle,
          BooleanTrigger,
          BoundedPhysicsModel,
          Box,
          CADAssembly,
          CADFace,
          CADLayer,
          CADPart,
          Circle2D,
          ClipPlane,
          //CollidableOffset,
          //CollidableShape,
          Collision,
          //CollisionCollection,
          //CollisionSensor,
          //CollisionSpace,
          Color,
          ColorChaser,
          ColorDamper,
          ColorInterpolator,
          ColorRGBA,
          ComposedCubeMapTexture,
          ComposedShader,
          //ComposedTexture3D,
          Cone,
          ConeEmitter,
          //Contact,
          //Contour2D,
          //ContourPolyline2D,
          Coordinate,
          CoordinateChaser,
          CoordinateDamper,
          CoordinateDouble,
          CoordinateInterpolator,
          CoordinateInterpolator2D,
          Cylinder,
          CylinderSensor,
          //DISEntityManager,
          //DISEntityTypeMapping,
          DirectionalLight,
          Disk2D,
          //DoubleAxisHingeJoint,
          EaseInEaseOut,
          ElevationGrid,
          //EspduTransform,
          ExplosionEmitter,
          Extrusion,
          //FillProperties,
          FloatVertexAttribute,
          Fog,
          //FogCoordinate,
          FontStyle,
          ForcePhysicsModel,
          GeneratedCubeMapTexture,
          GeoCoordinate,
          GeoElevationGrid,
          GeoLOD,
          GeoLocation,
          GeoMetadata,
          GeoOrigin,
          GeoPositionInterpolator,
          GeoProximitySensor,
          GeoTouchSensor,
          GeoTransform,
          GeoViewpoint,
          Group,
          //HAnimDisplacer,
          //HAnimHumanoid,
          //HAnimJoint,
          //HAnimSegment,
          //HAnimSite,
          ImageCubeMapTexture,
          ImageTexture,
          //ImageTexture3D,
          IndexedFaceSet,
          IndexedLineSet,
          IndexedQuadSet,
          IndexedTriangleFanSet,
          IndexedTriangleSet,
          IndexedTriangleStripSet,
          Inline,
          IntegerSequencer,
          IntegerTrigger,
          KeySensor,
          LOD,
          Layer,
          LayerSet,
          Layout,
          LayoutGroup,
          LayoutLayer,
          //LinePickSensor,
          LineProperties,
          LineSet,
          LoadSensor,
          LocalFog,
          Material,
          Matrix3VertexAttribute,
          Matrix4VertexAttribute,
          MetadataBoolean,
          MetadataDouble,
          MetadataFloat,
          MetadataInteger,
          MetadataSet,
          MetadataString,
          //MotorJoint,
          MovieTexture,
          //MultiTexture,
          //MultiTextureCoordinate,
          //MultiTextureTransform,
          NavigationInfo,
          Normal,
          NormalInterpolator,
          //NurbsCurve,
          //NurbsCurve2D,
          //NurbsOrientationInterpolator,
          //NurbsPatchSurface,
          //NurbsPositionInterpolator,
          //NurbsSet,
          //NurbsSurfaceInterpolator,
          //NurbsSweptSurface,
          //NurbsSwungSurface,
          //NurbsTextureCoordinate,
          //NurbsTrimmedSurface,
          OrientationChaser,
          OrientationDamper,
          OrientationInterpolator,
          OrthoViewpoint,
          //PackagedShader,
          ParticleSystem,
          //PickableGroup,
          PixelTexture,
          //PixelTexture3D,
          PlaneSensor,
          PointEmitter,
          PointLight,
          //PointPickSensor,
          PointSet,
          Polyline2D,
          PolylineEmitter,
          Polypoint2D,
          PositionChaser,
          PositionChaser2D,
          PositionDamper,
          PositionDamper2D,
          PositionInterpolator,
          PositionInterpolator2D,
          //PrimitivePickSensor,
          //ProgramShader,
          ProximitySensor,
          QuadSet,
          //ReceiverPdu,
          Rectangle2D,
          //RigidBody,
          //RigidBodyCollection,
          ScalarChaser,
          ScalarDamper,
          ScalarInterpolator,
          ScreenFontStyle,
          ScreenGroup,
          Script,
          ShaderPart,
          //ShaderProgram,
          Shape,
          //SignalPdu,
          //SingleAxisHingeJoint,
          //SliderJoint,
          Sound,
          Sphere,
          SphereSensor,
          SplinePositionInterpolator,
          SplinePositionInterpolator2D,
          SplineScalarInterpolator,
          SpotLight,
          SquadOrientationInterpolator,
          StaticGroup,
          //StringSensor,
          SurfaceEmitter,
          Switch,
          TexCoordChaser2D,
          TexCoordDamper2D,
          Text,
          TextureBackground,
          TextureCoordinate,
          TextureCoordinate3D,
          TextureCoordinate4D,
          //TextureCoordinateGenerator,
          TextureProperties,
          TextureTransform,
          TextureTransform3D,
          TextureTransformMatrix3D,
          TimeSensor,
          TimeTrigger,
          //TouchGroup,
          TouchSensor,
          Transform,
          TransformSensor,
          //TransmitterPdu,
          TriangleFanSet,
          TriangleSet,
          TriangleSet2D,
          TriangleStripSet,
          TwoSidedMaterial,
          //UniversalJoint,
          Viewpoint,
          ViewpointGroup,
          Viewport,
          VisibilitySensor,
          VolumeEmitter,
          //VolumePickSensor,
          WindPhysicsModel,
          WorldInfo)
{
"use strict";

	var supportedNodes =
	{
		// 3.1
		MetadataBool:                 MetadataBoolean,
		// 3.3
		Anchor:                       Anchor,
		Appearance:                   Appearance,
		Arc2D:                        Arc2D,
		ArcClose2D:                   ArcClose2D,
		AudioClip:                    AudioClip,
		Background:                   Background,
		//BallJoint:                    BallJoint,
		Billboard:                    Billboard,
		BooleanFilter:                BooleanFilter,
		BooleanSequencer:             BooleanSequencer,
		BooleanToggle:                BooleanToggle,
		BooleanTrigger:               BooleanTrigger,
		BoundedPhysicsModel:          BoundedPhysicsModel,
		Box:                          Box,
		CADAssembly:                  CADAssembly,
		CADFace:                      CADFace,
		CADLayer:                     CADLayer,
		CADPart:                      CADPart,
		Circle2D:                     Circle2D,
		ClipPlane:                    ClipPlane,
		//CollidableOffset:             CollidableOffset,
		//CollidableShape:              CollidableShape,
		Collision:                    Collision,
		//CollisionCollection:          CollisionCollection,
		//CollisionSensor:              CollisionSensor,
		//CollisionSpace:               CollisionSpace,
		Color:                        Color,
		ColorChaser:                  ColorChaser,
		ColorDamper:                  ColorDamper,
		ColorInterpolator:            ColorInterpolator,
		ColorRGBA:                    ColorRGBA,
		ComposedCubeMapTexture:       ComposedCubeMapTexture,
		ComposedShader:               ComposedShader,
		//ComposedTexture3D:            ComposedTexture3D,
		Cone:                         Cone,
		ConeEmitter:                  ConeEmitter,
		//Contact:                      Contact,
		//Contour2D:                    Contour2D,
		//ContourPolyline2D:            ContourPolyline2D,
		Coordinate:                   Coordinate,
		CoordinateChaser:             CoordinateChaser,
		CoordinateDamper:             CoordinateDamper,
		CoordinateDouble:             CoordinateDouble,
		CoordinateInterpolator:       CoordinateInterpolator,
		CoordinateInterpolator2D:     CoordinateInterpolator2D,
		Cylinder:                     Cylinder,
		CylinderSensor:               CylinderSensor,
		//DISEntityManager:             DISEntityManager,
		//DISEntityTypeMapping:         DISEntityTypeMapping,
		DirectionalLight:             DirectionalLight,
		Disk2D:                       Disk2D,
		//DoubleAxisHingeJoint:         DoubleAxisHingeJoint,
		EaseInEaseOut:                EaseInEaseOut,
		ElevationGrid:                ElevationGrid,
		//EspduTransform:               EspduTransform,
		ExplosionEmitter:             ExplosionEmitter,
		Extrusion:                    Extrusion,
		//FillProperties:               FillProperties,
		FloatVertexAttribute:         FloatVertexAttribute,
		Fog:                          Fog,
		//FogCoordinate:                FogCoordinate,
		FontStyle:                    FontStyle,
		ForcePhysicsModel:            ForcePhysicsModel,
		GeneratedCubeMapTexture:      GeneratedCubeMapTexture,
		GeoCoordinate:                GeoCoordinate,
		GeoElevationGrid:             GeoElevationGrid,
		GeoLOD:                       GeoLOD,
		GeoLocation:                  GeoLocation,
		GeoMetadata:                  GeoMetadata,
		GeoOrigin:                    GeoOrigin,
		GeoPositionInterpolator:      GeoPositionInterpolator,
		GeoProximitySensor:           GeoProximitySensor,
		GeoTouchSensor:               GeoTouchSensor,
		GeoTransform:                 GeoTransform,
		GeoViewpoint:                 GeoViewpoint,
		Group:                        Group,
		//HAnimDisplacer:               HAnimDisplacer,
		//HAnimHumanoid:                HAnimHumanoid,
		//HAnimJoint:                   HAnimJoint,
		//HAnimSegment:                 HAnimSegment,
		//HAnimSite:                    HAnimSite,
		ImageCubeMapTexture:          ImageCubeMapTexture,
		ImageTexture:                 ImageTexture,
		//ImageTexture3D:               ImageTexture3D,
		IndexedFaceSet:               IndexedFaceSet,
		IndexedLineSet:               IndexedLineSet,
		IndexedQuadSet:               IndexedQuadSet,
		IndexedTriangleFanSet:        IndexedTriangleFanSet,
		IndexedTriangleSet:           IndexedTriangleSet,
		IndexedTriangleStripSet:      IndexedTriangleStripSet,
		Inline:                       Inline,
		IntegerSequencer:             IntegerSequencer,
		IntegerTrigger:               IntegerTrigger,
		KeySensor:                    KeySensor,
		LOD:                          LOD,
		Layer:                        Layer,
		LayerSet:                     LayerSet,
		Layout:                       Layout,
		LayoutGroup:                  LayoutGroup,
		LayoutLayer:                  LayoutLayer,
		//LinePickSensor:               LinePickSensor,
		LineProperties:               LineProperties,
		LineSet:                      LineSet,
		LoadSensor:                   LoadSensor,
		LocalFog:                     LocalFog,
		Material:                     Material,
		Matrix3VertexAttribute:       Matrix3VertexAttribute,
		Matrix4VertexAttribute:       Matrix4VertexAttribute,
		MetadataBoolean:              MetadataBoolean,
		MetadataDouble:               MetadataDouble,
		MetadataFloat:                MetadataFloat,
		MetadataInteger:              MetadataInteger,
		MetadataSet:                  MetadataSet,
		MetadataString:               MetadataString,
		//MotorJoint:                   MotorJoint,
		MovieTexture:                 MovieTexture,
		//MultiTexture:                 MultiTexture,
		//MultiTextureCoordinate:       MultiTextureCoordinate,
		//MultiTextureTransform:        MultiTextureTransform,
		NavigationInfo:               NavigationInfo,
		Normal:                       Normal,
		NormalInterpolator:           NormalInterpolator,
		//NurbsCurve:                   NurbsCurve,
		//NurbsCurve2D:                 NurbsCurve2D,
		//NurbsOrientationInterpolator: NurbsOrientationInterpolator,
		//NurbsPatchSurface:            NurbsPatchSurface,
		//NurbsPositionInterpolator:    NurbsPositionInterpolator,
		//NurbsSet:                     NurbsSet,
		//NurbsSurfaceInterpolator:     NurbsSurfaceInterpolator,
		//NurbsSweptSurface:            NurbsSweptSurface,
		//NurbsSwungSurface:            NurbsSwungSurface,
		//NurbsTextureCoordinate:       NurbsTextureCoordinate,
		//NurbsTrimmedSurface:          NurbsTrimmedSurface,
		OrientationChaser:            OrientationChaser,
		OrientationDamper:            OrientationDamper,
		OrientationInterpolator:      OrientationInterpolator,
		OrthoViewpoint:               OrthoViewpoint,
		//PackagedShader:               PackagedShader,
		ParticleSystem:               ParticleSystem,
		//PickableGroup:                PickableGroup,
		PixelTexture:                 PixelTexture,
		//PixelTexture3D:               PixelTexture3D,
		PlaneSensor:                  PlaneSensor,
		PointEmitter:                 PointEmitter,
		PointLight:                   PointLight,
		//PointPickSensor:              PointPickSensor,
		PointSet:                     PointSet,
		Polyline2D:                   Polyline2D,
		PolylineEmitter:              PolylineEmitter,
		Polypoint2D:                  Polypoint2D,
		PositionChaser:               PositionChaser,
		PositionChaser2D:             PositionChaser2D,
		PositionDamper:               PositionDamper,
		PositionDamper2D:             PositionDamper2D,
		PositionInterpolator:         PositionInterpolator,
		PositionInterpolator2D:       PositionInterpolator2D,
		//PrimitivePickSensor:          PrimitivePickSensor,
		//ProgramShader:                ProgramShader,
		ProximitySensor:              ProximitySensor,
		QuadSet:                      QuadSet,
		//ReceiverPdu:                  ReceiverPdu,
		Rectangle2D:                  Rectangle2D,
		//RigidBody:                    RigidBody,
		//RigidBodyCollection:          RigidBodyCollection,
		ScalarChaser:                 ScalarChaser,
		ScalarDamper:                 ScalarDamper,
		ScalarInterpolator:           ScalarInterpolator,
		ScreenFontStyle:              ScreenFontStyle,
		ScreenGroup:                  ScreenGroup,
		Script:                       Script,
		ShaderPart:                   ShaderPart,
		//ShaderProgram:                ShaderProgram,
		Shape:                        Shape,
		//SignalPdu:                    SignalPdu,
		//SingleAxisHingeJoint:         SingleAxisHingeJoint,
		//SliderJoint:                  SliderJoint,
		Sound:                        Sound,
		Sphere:                       Sphere,
		SphereSensor:                 SphereSensor,
		SplinePositionInterpolator:   SplinePositionInterpolator,
		SplinePositionInterpolator2D: SplinePositionInterpolator2D,
		SplineScalarInterpolator:     SplineScalarInterpolator,
		SpotLight:                    SpotLight,
		SquadOrientationInterpolator: SquadOrientationInterpolator,
		StaticGroup:                  StaticGroup,
		//StringSensor:                 StringSensor,
		SurfaceEmitter:               SurfaceEmitter,
		Switch:                       Switch,
		TexCoordChaser2D:             TexCoordChaser2D,
		TexCoordDamper2D:             TexCoordDamper2D,
		Text:                         Text,
		TextureBackground:            TextureBackground,
		TextureCoordinate:            TextureCoordinate,
		TextureCoordinate3D:          TextureCoordinate3D,
		TextureCoordinate4D:          TextureCoordinate4D,
		//TextureCoordinateGenerator:   TextureCoordinateGenerator,
		TextureProperties:            TextureProperties,
		TextureTransform:             TextureTransform,
		TextureTransform3D:           TextureTransform3D,
		TextureTransformMatrix3D:     TextureTransformMatrix3D,
		TimeSensor:                   TimeSensor,
		TimeTrigger:                  TimeTrigger,
		//TouchGroup:                   TouchGroup,
		TouchSensor:                  TouchSensor,
		Transform:                    Transform,
		TransformSensor:              TransformSensor,
		//TransmitterPdu:               TransmitterPdu,
		TriangleFanSet:               TriangleFanSet,
		TriangleSet:                  TriangleSet,
		TriangleSet2D:                TriangleSet2D,
		TriangleStripSet:             TriangleStripSet,
		TwoSidedMaterial:             TwoSidedMaterial,
		//UniversalJoint:               UniversalJoint,
		Viewpoint:                    Viewpoint,
		ViewpointGroup:               ViewpointGroup,
		Viewport:                     Viewport,
		VisibilitySensor:             VisibilitySensor,
		VolumeEmitter:                VolumeEmitter,
		//VolumePickSensor:             VolumePickSensor,
		WindPhysicsModel:             WindPhysicsModel,
		WorldInfo:                    WorldInfo,
	};

	function createInstance (executionContext) { return new this (executionContext); }

	for (var name in supportedNodes)
	{
		supportedNodes [name] .createInstance = createInstance .bind (supportedNodes [name]);
		supportedNodes [name.toUpperCase()] = supportedNodes [name]; 
		supportedNodes [name.toUpperCase()] .createInstance = createInstance .bind (supportedNodes [name]);
	}
	return supportedNodes;
});
